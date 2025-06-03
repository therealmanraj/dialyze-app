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
  // 1) Get the patient object from route.params:
  const { patient } = route.params;

  // 2) Grab the context function for updating clinical info:
  const { updatePatientClinical } = useContext(PatientsContext);

  // 3) Create state variables for each clinical field:
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");

  // 4) On mount, initialize those useState(...) fields from patient.clinical:
  useEffect(() => {
    if (patient.clinical) {
      setWeight(patient.clinical.weight || "");
      setHeight(patient.clinical.height || "");
      setAge(patient.clinical.age || "");
      setGender(patient.clinical.gender || "");
      setNotes(patient.clinical.notes || "");
    }
  }, [patient]);

  // 5) When “Update” is pressed, push the new .clinical back into context:
  const handleUpdate = () => {
    // Build a newClinical object—only include fields we want to overwrite:
    const newClinical = {
      weight: weight.trim(),
      height: height.trim(),
      age: age.trim(),
      gender: gender.trim(),
      notes: notes.trim(),
    };

    // Call the context updater:
    updatePatientClinical(patient.id, newClinical);

    // Go back to the summary screen:
    navigation.goBack();
  };

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
            name={""} // no name field here, just clinical inputs
            setName={() => {}} // no-op
            photoUri={patient.avatar} // we ignore photo on this screen
            setPhotoUri={() => {}}
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            // We added “notes” inside ClinicalInfoInputs? If not, treat notes separately:
            // But since your ClinicalInfoInputs does not handle notes, we’ll add a quick text input below:
          />

          {/* If you want a “Notes” field, you can add it below ClinicalInfoInputs: */}
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
