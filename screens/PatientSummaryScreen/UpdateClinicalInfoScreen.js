// screens/UpdateClinicalInfoScreen.js
import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PatientsContext } from "../contexts/PatientsContext";
import ClinicalInfoInputs from "../components/ClinicalInfoInputs";

export default function UpdateClinicalInfoScreen({ route, navigation }) {
  // 1) Read just patientId from params
  const { patientId } = route.params;

  // 2) Grab both the full list and the updater function from context
  const { patients, updatePatientClinical } = useContext(PatientsContext);

  // 3) Find the “live” patient object by ID
  const patient = patients.find((p) => p.id === patientId);

  // 4) Local state for each clinical field (strings)
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");

  // 5) Initialize those fields from patient.clinical once we have it
  useEffect(() => {
    if (!patient) return;

    const { clinical } = patient;
    setWeight(clinical.weight || "");
    setHeight(clinical.height || "");
    setAge(clinical.age || "");
    setGender(clinical.gender || "");
    setNotes(clinical.notes || "");
  }, [patient]);

  // 6) When user presses “Update,” call context updater and then goBack()
  const handleUpdate = () => {
    if (!patient) return;

    const newClinical = {
      weight: weight.trim(),
      height: height.trim(),
      age: age.trim(),
      gender: gender.trim(),
      notes: notes.trim(),
    };

    updatePatientClinical(patient.id, newClinical);
    navigation.goBack();
  };

  // If patient somehow is not found, show a fallback
  if (!patient) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Update Clinical Information</Text>
          <View style={{ width: 24 }} />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#fff" }}>Patient not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* fixed header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Clinical Information</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* form + footer slide up with keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <ClinicalInfoInputs
            name={""} // not editing name here
            setName={() => {}}
            photoUri={patient.avatar} // ignoring photo changes on this screen
            setPhotoUri={() => {}}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
          />

          {/* Notes field (ClinicalInfoInputs doesn’t include notes) */}
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              placeholder="Enter clinical notes"
              placeholderTextColor="#91b0ca"
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </ScrollView>

        {/* always-visible update button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#151a1e",
  },
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
  form: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: "#151a1e",
  },
  updateButton: {
    backgroundColor: "#6270ea",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
