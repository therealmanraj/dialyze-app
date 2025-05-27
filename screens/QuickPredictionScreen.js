// screens/QuickPredictionScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LabValuesInputs from "./components/LabValuesInputs";

export default function QuickPredictionScreen({ navigation }) {
  // unified lab‐values state
  const [labValues, setLabValues] = useState({});

  function handlePredict() {
    // You can pick out just the four you care about, or pass the whole object
    navigation.navigate("PredictionOutcome", {
      akiRisk: "Moderate",
      dialysisNeed: "Low",
      labValues,
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

      {/* inputs + button slide up above keyboard */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* inject shared LabValuesInputs here */}
          <LabValuesInputs labValues={labValues} setLabValues={setLabValues} />
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
    paddingTop: 8,
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
