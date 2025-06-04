// screens/AddNewPatientScreen.js
import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ClinicalInfoInputs from "./components/ClinicalInfoInputs";
import LabValuesInputs from "./components/LabValuesInputs";

import placeholder from "../assets/placeholder.png";

import { PatientsContext } from "./contexts/PatientsContext";

export default function AddNewPatientScreen({ navigation }) {
  const DEFAULT_AVATAR = placeholder;

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

  function handleSave() {
    const newPatient = {
      id: Date.now().toString(),
      name: clin.name.trim() || "Unnamed Patient",
      details: `Age: ${clin.age.trim() || "N/A"}, ${
        clin.gender.trim() || "N/A"
      }`,
      avatar: clin.photoUri || DEFAULT_AVATAR,
      riskLabel: "N/A",
      riskPct: "N/A",
      riskColor: "#ccc",
      clinical: {
        age: clin.age,
        gender: clin.gender,
        height: clin.height,
        weight: clin.weight,
        notes: clin.notes,
        photoUri: clin.photoUri,
      },
      labValues: { ...labValues },
    };

    addPatient(newPatient);

    navigation.navigate("MainTabs", {
      screen: "Home",
      params: { newPatient },
    });
  }

  return (
    <SafeAreaView style={styles.root}>
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
          />

          <Text style={styles.sectionTitle}>Clinical Notes</Text>
          <TextInput
            style={[styles.input, { height: 120, textAlignVertical: "top" }]}
            placeholder="Enter clinical notes"
            placeholderTextColor="#91b0ca"
            multiline
            value={clin.notes}
            onChangeText={(v) => setClin({ ...clin, notes: v })}
          />

          <Text style={styles.sectionTitle}>Lab Values</Text>
          <LabValuesInputs labValues={labValues} setLabValues={setLabValues} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Patient</Text>
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
    paddingBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
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
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
