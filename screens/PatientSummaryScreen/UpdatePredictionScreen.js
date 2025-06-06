// screens/UpdatePredictionScreen.js

import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { PatientsContext } from "../contexts/PatientsContext";
import LabValuesInputs from "../components/LabValuesInputs";

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

export default function UpdatePredictionScreen({ navigation, route }) {
  const { patientId, labValues: initialLab } = route.params;
  const { updatePatient } = useContext(PatientsContext);

  const [labValues, setLabValues] = useState(initialLab || {});

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
      updatePatient(patientId, { labValues });
      navigation.goBack();
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

      updatePatient(patientId, {
        labValues: { ...labValues },
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
        predictedClass: PredictedClass,
        predictedProba: PredictedProba,
      });

      navigation.goBack();
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
              updatePatient(patientId, { labValues });
              navigation.goBack();
            },
          },
        ]
      );
    } finally {
      setLoadingPrediction(false);
    }
  }

  return (
    <SafeAreaView
      style={styles.root}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Lab Values</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
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
              styles.updateButton,
              loadingPrediction && styles.buttonDisabled,
            ]}
            onPress={handleFooterPress}
            disabled={loadingPrediction}
          >
            {loadingPrediction ? (
              <Text style={styles.updateButtonText}>Please wait…</Text>
            ) : allLabsFilled() ? (
              <Text style={styles.updateButtonText}>Update & Predict</Text>
            ) : (
              <Text style={styles.updateButtonText}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#111a22",
  },
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
    paddingBottom: 24,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#111a22",
  },
  updateButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#555",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
