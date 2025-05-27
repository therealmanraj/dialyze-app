// screens/QuickPredictionScreen.js
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
      {/* fixed header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialyze</Text>
      </View>

      {/* fixed page title & subtitle */}
      <Text style={styles.pageTitle}>Quick Prediction</Text>
      <Text style={styles.pageSub}>
        Enter lab values to get an immediate prediction of Acute Kidney Injury
        risk and dialysis need.
      </Text>

      {/* only inputs + button live in KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
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
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.predictButton}
            onPress={handlePredict}
          >
            <Text style={styles.predictButtonText}>Predict</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#151a1e" },

  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#151a1e",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  pageTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  pageSub: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
    paddingHorizontal: 16,
  },

  content: {
    paddingHorizontal: 16,
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

  footer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#151a1e",
  },
  predictButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  predictButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
