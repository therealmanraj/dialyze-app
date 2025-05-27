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

export default function AddNewPatientScreen({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [notes, setNotes] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [bun, setBun] = useState("");
  const [urineOutput, setUrineOutput] = useState("");
  const [potassium, setPotassium] = useState("");

  function handleSave() {
    // TODO: persist patient
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* header stays fixed */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Patient</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* this will adjust when keyboard opens */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Patient name */}
          <View style={styles.field}>
            <Text style={styles.label}>Patient Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter patient name"
              placeholderTextColor="#91b0ca"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Age & Gender */}
          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter age"
                placeholderTextColor="#91b0ca"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter gender"
                placeholderTextColor="#91b0ca"
                value={gender}
                onChangeText={setGender}
              />
            </View>
          </View>

          {/* Clinical Notes */}
          <View style={styles.field}>
            <Text style={styles.label}>Clinical Notes</Text>
            <TextInput
              style={[styles.input, { height: 120, textAlignVertical: "top" }]}
              placeholder="Enter clinical notes"
              placeholderTextColor="#91b0ca"
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          {/* Lab Values */}
          <Text style={styles.sectionTitle}>Lab Values</Text>
          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Creatinine (mg/dL)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value"
                placeholderTextColor="#91b0ca"
                keyboardType="numeric"
                value={creatinine}
                onChangeText={setCreatinine}
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>BUN (mg/dL)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value"
                placeholderTextColor="#91b0ca"
                keyboardType="numeric"
                value={bun}
                onChangeText={setBun}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Urine Output (mL/day)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value"
                placeholderTextColor="#91b0ca"
                keyboardType="numeric"
                value={urineOutput}
                onChangeText={setUrineOutput}
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Potassium (mEq/L)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value"
                placeholderTextColor="#91b0ca"
                keyboardType="numeric"
                value={potassium}
                onChangeText={setPotassium}
              />
            </View>
          </View>
        </ScrollView>

        {/* footer will move up with the rest */}
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
  field: {
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 8,
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
