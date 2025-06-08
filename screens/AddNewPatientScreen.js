// screens/AddNewPatientScreen.js

import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import ClinicalInfoInputs from "./components/ClinicalInfoInputs";
import LabValuesInputs from "./components/LabValuesInputs";

import placeholder from "../assets/placeholder.png";
import { PatientsContext } from "./contexts/PatientsContext";

import {
  SageMakerRuntimeClient,
  InvokeEndpointCommand,
} from "@aws-sdk/client-sagemaker-runtime";

import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  AWS_REGION,
  SAGEMAKER_ENDPOINT,
} from "@env";

const LAB_FIELDS = [
  "HCO3",
  "Creatinine",
  "Mean Arterial Pressure",
  "Procalcitonin",
  "Bilirubin",
  "pH",
  "Albumin",
  "Urea",
  "White Blood Cell Count",
  "SOFA",
  "APACHEII",
  "Glasgow",
];

export default function AddNewPatientScreen({ navigation }) {
  const DEFAULT_AVATAR = Image.resolveAssetSource(placeholder).uri;
  const { addPatient } = useContext(PatientsContext);

  const [clin, setClin] = useState({
    name: "",
    photoUri: null,
    age: "",
    gender: "",
    height: "",
    weight: "",
    notes: "",
  });
  const [labValues, setLabValues] = useState({});

  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [predictedProba, setPredictedProba] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [riskLevel, setRiskLevel] = useState("N/A");
  const [riskPct, setRiskPct] = useState("N/A");

  function allLabsFilled() {
    return LAB_FIELDS.every((fld) => {
      const v = labValues[fld];
      return typeof v === "string" && v.trim() !== "";
    });
  }

  const client = new SageMakerRuntimeClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      sessionToken: AWS_SESSION_TOKEN || "",
    },
  });

  async function handleFooterPress() {
    if (!allLabsFilled()) {
      savePatientWithoutPrediction();
      return;
    }

    setLoadingPrediction(true);
    try {
      const payloadObject = {};
      LAB_FIELDS.forEach((key) => {
        const num = parseFloat(labValues[key]);
        payloadObject[key] = isNaN(num) ? null : num;
      });
      const bodyString = JSON.stringify(payloadObject);

      const command = new InvokeEndpointCommand({
        EndpointName: SAGEMAKER_ENDPOINT,
        ContentType: "application/json",
        Accept: "application/json",
        Body: bodyString,
      });

      const response = await client.send(command);

      let responseBody = "";
      if (response.Body instanceof Uint8Array) {
        responseBody = new TextDecoder("utf-8").decode(response.Body);
      } else if (response.Body?.text) {
        responseBody = await response.Body.text();
      } else {
        responseBody = response.Body?.toString() ?? "";
      }

      let parsed;
      try {
        parsed = JSON.parse(responseBody);
      } catch (err) {
        throw new Error(`Invalid JSON from SageMaker: ${responseBody}`);
      }
      const first =
        Array.isArray(parsed) && parsed.length > 0
          ? parsed[0]
          : { PredictedClass: null, PredictedProba: null };

      const { PredictedClass, PredictedProba } = first;
      setPredictedClass(PredictedClass);
      setPredictedProba(PredictedProba);

      const pctString =
        typeof PredictedProba === "number"
          ? `${(PredictedProba * 100).toFixed(1)}%`
          : "N/A";
      setRiskPct(pctString);

      let level = "N/A";
      if (typeof PredictedProba === "number") {
        if (PredictedProba < 0.1) level = "Low";
        else if (PredictedProba < 0.2) level = "Medium";
        else level = "High";
      }
      setRiskLevel(level);

      savePatientWithPrediction(
        level,
        pctString,
        PredictedClass,
        PredictedProba
      );
    } catch (err) {
      console.error("Error invoking SageMaker endpoint:", err);
      Alert.alert(
        "Prediction Error",
        `Could not get model prediction:\n${
          err.message || JSON.stringify(err)
        }`,
        [
          {
            text: "OK",
            onPress: () => {
              savePatientWithoutPrediction();
            },
          },
        ]
      );
    } finally {
      setLoadingPrediction(false);
    }
  }

  function savePatientWithPrediction(level, pctString, cls, proba) {
    const newPatient = {
      id: Date.now().toString(),
      name: clin.name.trim() || "Unnamed Patient",
      details: `Age: ${clin.age.trim() || "N/A"}, ${
        clin.gender.trim() || "N/A"
      }`,
      avatar: clin.photoUri || DEFAULT_AVATAR,

      riskLabel: level,
      riskPct: pctString,
      riskColor:
        level === "Low"
          ? "#4caf50"
          : level === "Medium"
          ? "#fbc02d"
          : level === "High"
          ? "#e53935"
          : "#cccccc",

      clinical: {
        age: clin.age,
        gender: clin.gender,
        height: clin.height,
        weight: clin.weight,
        notes: clin.notes,
        photoUri: clin.photoUri,
      },

      labValues: { ...labValues },

      predictedClass: cls,
      predictedProba: proba,
    };

    addPatient(newPatient);
    navigation.navigate("MainTabs", {
      screen: "Home",
      params: { newPatient },
    });
  }

  function savePatientWithoutPrediction() {
    const newPatient = {
      id: Date.now().toString(),
      name: clin.name.trim() || "Unnamed Patient",
      details: `Age: ${clin.age.trim() || "N/A"}, ${
        clin.gender.trim() || "N/A"
      }`,
      avatar: clin.photoUri || DEFAULT_AVATAR,

      riskLabel: "N/A",
      riskPct: "N/A",
      riskColor: "#cccccc",

      clinical: {
        age: clin.age,
        gender: clin.gender,
        height: clin.height,
        weight: clin.weight,
        notes: clin.notes,
        photoUri: clin.photoUri,
      },

      labValues: { ...labValues },

      predictedClass: null,
      predictedProba: null,
    };

    addPatient(newPatient);
    navigation.navigate("MainTabs", {
      screen: "Home",
      params: { newPatient },
    });
  }

  return (
    <SafeAreaView
      style={styles.root}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Patient</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <ClinicalInfoInputs
            name={clin.name}
            setName={(v) => setClin({ ...clin, name: v })}
            photoUri={clin.photoUri}
            setPhotoUri={(uri) => setClin({ ...clin, photoUri: uri })}
            age={clin.age}
            setAge={(v) => setClin({ ...clin, age: v })}
            gender={clin.gender}
            setGender={(v) => setClin({ ...clin, gender: v })}
            height={clin.height}
            setHeight={(v) => setClin({ ...clin, height: v })}
            weight={clin.weight}
            setWeight={(v) => setClin({ ...clin, weight: v })}
            notes={clin.notes}
            setNotes={(v) => setClin({ ...clin, notes: v })}
          />

          <Text style={styles.sectionTitle}>Lab Values</Text>
          <LabValuesInputs labValues={labValues} setLabValues={setLabValues} />

          {loadingPrediction && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0f7fdb" />
              <Text style={styles.loadingText}>Predicting risk…</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              loadingPrediction && styles.buttonDisabled,
            ]}
            onPress={handleFooterPress}
            disabled={loadingPrediction}
          >
            {loadingPrediction ? (
              <Text style={styles.saveButtonText}>Please wait…</Text>
            ) : allLabsFilled() ? (
              <Text style={styles.saveButtonText}>Predict & Save Patient</Text>
            ) : (
              <Text style={styles.saveButtonText}>Save Patient</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#111a22" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#111a22",
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 8,
  },

  loadingContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
  },

  footer: {
    padding: 16,
    backgroundColor: "#111a22",
  },
  saveButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#555",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
