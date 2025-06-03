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

  // 2) Grab both the full list and our updater from context
  const { patients, updatePatient } = useContext(PatientsContext);

  // 3) Find the “live” patient object by ID
  const patient = patients.find((p) => p.id === patientId);

  // 4) Local state for every field we want to edit:
  //    • name        (string)
  //    • photoUri    (string)
  //    • weight      (string)
  //    • height      (string)
  //    • age         (string)
  //    • gender      (string)
  //    • notes       (string)
  const [name, setName] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");

  // 5) Initialize those fields from patient once we have it
  useEffect(() => {
    if (!patient) return;

    setName(patient.name || "");
    setPhotoUri(patient.avatar || "");
    const c = patient.clinical || {};
    setWeight(c.weight || "");
    setHeight(c.height || "");
    setAge(c.age || "");
    setGender(c.gender || "");
    setNotes(c.notes || "");
  }, [patient]);

  // 6) When user presses “Update,” call context updater and then goBack()
  const handleUpdate = () => {
    if (!patient) return;

    // Build a newClinical object
    const newClinical = {
      weight: weight.trim(),
      height: height.trim(),
      age: age.trim(),
      gender: gender.trim(),
      notes: notes.trim(),
    };

    // Call the unified updater:
    updatePatient(patient.id, {
      name: name.trim(),
      avatar: photoUri, // pass the new (or unchanged) photo URI
      clinical: newClinical, // pass all clinical fields as an object
    });

    // Return to the previous screen
    navigation.goBack();
  };

  // If somehow our patientID didn’t match anything, show a fallback:
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
        <View style={styles.fallbackContainer}>
          <Text style={{ color: "#fff" }}>Patient not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* Fixed header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Clinical Information</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form + keyboard handling */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          {/* Pass **all** editable fields into ClinicalInfoInputs. */}
          <ClinicalInfoInputs
            name={name}
            setName={setName}
            photoUri={photoUri}
            setPhotoUri={setPhotoUri}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
          />

          {/* Notes is not part of ClinicalInfoInputs, so we add it manually: */}
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

        {/* Always-visible “Update” button */}
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
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
