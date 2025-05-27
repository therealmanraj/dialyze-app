// screens/UpdatePredictionScreen.js
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

export default function UpdatePredictionScreen({ navigation }) {
  const [creatinine, setCreatinine] = useState("");
  const [bun, setBun] = useState("");
  const [potassium, setPotassium] = useState("");
  const [bicarbonate, setBicarbonate] = useState("");
  const [urineOutput, setUrineOutput] = useState("");

  function handleUpdate() {
    // TODO: validate & re-run your prediction
    navigation.goBack();
  }

  const fields = [
    { label: "Creatinine", value: creatinine, setter: setCreatinine },
    { label: "BUN", value: bun, setter: setBun },
    { label: "Potassium", value: potassium, setter: setPotassium },
    { label: "Bicarbonate", value: bicarbonate, setter: setBicarbonate },
    { label: "Urine Output", value: urineOutput, setter: setUrineOutput },
  ];

  return (
    <SafeAreaView style={styles.root}>
      {/* —— header —— */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Lab Values</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* —— this lifts whole form & footer above keyboard —— */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {fields.map(({ label, value, setter }) => (
            <View key={label}>
              <Text style={styles.inputLabel}>{label}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter value"
                placeholderTextColor="#91b0ca"
                value={value}
                onChangeText={setter}
                keyboardType="numeric"
              />
            </View>
          ))}
        </ScrollView>

        {/* —— Update button always visible at bottom —— */}
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
  inputLabel: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: "#111a22",
  },
  updateButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
