import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddNewPatientScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    notes: "",
    creatinine: "",
    bun: "",
    urineOutput: "",
    potassium: "",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    // TODO: validate + persist
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* — Header — */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Patient</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* — Patient Info — */}
        <Text style={styles.sectionTitle}>Patient Details</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient name"
          placeholderTextColor="#91b0ca"
          value={form.name}
          onChangeText={(v) => update("name", v)}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              placeholderTextColor="#91b0ca"
              keyboardType="numeric"
              value={form.age}
              onChangeText={(v) => update("age", v)}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              placeholder="Male / Female"
              placeholderTextColor="#91b0ca"
              value={form.gender}
              onChangeText={(v) => update("gender", v)}
            />
          </View>
        </View>

        {/* — Clinical Notes — */}
        <Text style={styles.sectionTitle}>Clinical Notes</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter clinical notes"
          placeholderTextColor="#91b0ca"
          multiline
          value={form.notes}
          onChangeText={(v) => update("notes", v)}
        />

        {/* — Lab Values — */}
        <Text style={styles.sectionTitle}>Lab Values</Text>
        {[
          ["Creatinine (mg/dL)", "creatinine"],
          ["BUN (mg/dL)", "bun"],
          ["Urine Output (mL/day)", "urineOutput"],
          ["Potassium (mEq/L)", "potassium"],
        ].map(([label, key]) => (
          <View key={key} style={styles.row}>
            <View style={styles.full}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value"
                placeholderTextColor="#91b0ca"
                keyboardType="numeric"
                value={form[key]}
                onChangeText={(v) => update(key, v)}
              />
            </View>
          </View>
        ))}

        {/* — Save Button — */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Patient</Text>
        </TouchableOpacity>
      </ScrollView>
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
  content: { padding: 16, paddingBottom: 32 },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 8,
  },
  label: { color: "#fff", fontSize: 14, marginBottom: 4 },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    color: "#fff",
    marginBottom: 16,
  },
  textArea: {
    backgroundColor: "#233748",
    borderRadius: 12,
    minHeight: 100,
    padding: 12,
    color: "#fff",
    textAlignVertical: "top",
    marginBottom: 16,
  },
  row: { flexDirection: "row", marginBottom: 8 },
  half: { flex: 1, marginRight: 8 },
  full: { flex: 1 },
  saveButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
