// screens/QuickPredictionScreen/AddPatientScreen.js
import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ClinicalInfoInputs from "../components/ClinicalInfoInputs";
import placeholder from "../../assets/placeholder.png";
import { PatientsContext } from "../contexts/PatientsContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPatientScreen({ navigation, route }) {
  const DEFAULT_AVATAR = Image.resolveAssetSource(placeholder).uri;
  const { addPatient } = useContext(PatientsContext);
  const {
    PredictedClass = null,
    PredictedProba = null,
    riskLevel = "N/A",
    pct = "N/A",
    labValues: incomingLabValues = {},
  } = route.params || {};

  const [clin, setClin] = useState({
    name: "",
    photoUri: null,
    age: "",
    gender: "",
    height: "",
    weight: "",
    notes: "",
  });

  function handleAdd() {
    const newPatient = {
      id: Date.now().toString(),
      name: clin.name.trim() || "Unnamed Patient",
      details: `Age: ${clin.age.trim() || "N/A"}, ${
        clin.gender.trim() || "N/A"
      }`,
      avatar: clin.photoUri || DEFAULT_AVATAR,
      riskLabel: riskLevel,
      riskPct: pct,
      riskColor:
        riskLevel === "Low"
          ? "#4caf50"
          : riskLevel === "Medium"
          ? "#fbc02d"
          : riskLevel === "High"
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
      labValues: { ...incomingLabValues },
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
        <Text style={styles.headerTitle}>Dialyze</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Add Patient Details</Text>
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
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Save Patient</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#151a1e" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#151a1e",
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
    paddingBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#151a1e",
  },
  addButton: {
    backgroundColor: "#cedfed",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#151a1e",
    fontSize: 16,
    fontWeight: "700",
  },
});
