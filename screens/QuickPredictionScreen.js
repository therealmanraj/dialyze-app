// screens/QuickPredictionScreen.js
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

export default function QuickPredictionScreen({ navigation }) {
  const [creatinine, setCreatinine] = useState("");
  const [bun, setBun] = useState("");
  const [potassium, setPotassium] = useState("");
  const [urineOutput, setUrineOutput] = useState("");

  function handlePredict() {
    navigation.navigate("PredictionOutcome", {
      akiRisk: "Moderate",
      dialysisNeed: "Low",
    });
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialyze</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Quick Prediction</Text>
        <Text style={styles.subtitle}>
          Enter lab values to get an immediate prediction of Acute Kidney Injury
          risk and dialysis need.
        </Text>

        {[
          {
            placeholder: "Creatinine (mg/dL)",
            value: creatinine,
            onChange: setCreatinine,
          },
          { placeholder: "BUN (mg/dL)", value: bun, onChange: setBun },
          {
            placeholder: "Potassium (mEq/L)",
            value: potassium,
            onChange: setPotassium,
          },
          {
            placeholder: "Urine Output (mL/day)",
            value: urineOutput,
            onChange: setUrineOutput,
          },
        ].map(({ placeholder, value, onChange }) => (
          <TextInput
            key={placeholder}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#91b0ca"
            value={value}
            onChangeText={onChange}
          />
        ))}

        <TouchableOpacity style={styles.predictButton} onPress={handlePredict}>
          <Text style={styles.predictButtonText}>Predict</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#151a1e" },
  header: {
    padding: 16,
    backgroundColor: "#151a1e",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
  },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
    marginVertical: 8,
  },
  predictButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  predictButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
