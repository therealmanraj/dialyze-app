// screens/AddNewPatientScreen.js
import React, { useState } from "react";
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

export default function AddNewPatientScreen({ navigation }) {
  // clinical info
  const [clin, setClin] = useState({
    name: "",
    photoUri: null,
    age: "",
    gender: "",
    height: "",
    weight: "",
    notes: "",
  });
  // lab values
  const [labValues, setLabValues] = useState({});

  function handleSave() {
    // TODO: persist patient (clin + labValues)
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* fixed header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Patient</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* inputs + footer slide up */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Clinical Info */}
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

          {/* Clinical Notes */}
          <Text style={styles.sectionTitle}>Clinical Notes</Text>
          <TextInput
            style={[styles.input, { height: 120, textAlignVertical: "top" }]}
            placeholder="Enter clinical notes"
            placeholderTextColor="#91b0ca"
            multiline
            value={clin.notes}
            onChangeText={(v) => setClin({ ...clin, notes: v })}
          />

          {/* Lab Values */}
          <Text style={styles.sectionTitle}>Lab Values</Text>
          <LabValuesInputs labValues={labValues} setLabValues={setLabValues} />
        </ScrollView>

        {/* always-visible Save button */}
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
