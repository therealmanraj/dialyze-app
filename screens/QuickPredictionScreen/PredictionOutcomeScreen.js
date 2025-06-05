// screens/PredictionOutcomeScreen.js
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import RiskSection from "../components/RiskSection";

export default function PredictionOutcomeScreen({ navigation, route }) {
  const { prediction, labValues } = route.params;

  const first =
    Array.isArray(prediction) && prediction.length > 0
      ? prediction[0]
      : { PredictedClass: null, PredictedProba: null };

  const { PredictedClass, PredictedProba } = first;

  const pct =
    typeof PredictedProba === "number"
      ? `${(PredictedProba * 100).toFixed(1)}%`
      : "N/A";

  let riskLevel = "N/A";
  if (typeof PredictedProba === "number") {
    if (PredictedProba < 0.1) {
      riskLevel = "Low";
    } else if (PredictedProba < 0.2) {
      riskLevel = "Medium";
    } else {
      riskLevel = "High";
    }
  }

  return (
    <SafeAreaView
      style={styles.root}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dialyze</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Prediction Outcome</Text>

        <Text style={styles.subtitle}>
          Based on the entered lab values, your AKI risk summary is shown below.
        </Text>

        <RiskSection
          akiRisk={[
            { label: "Risk Score", value: pct },
            { label: "Risk Level", value: riskLevel },
          ]}
          dialysisNeed={[
            { label: "Score", value: "—" },
            { label: "Probability", value: "—" },
          ]}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddPatient", {
              PredictedClass,
              PredictedProba,
              riskLevel,
              pct,
              labValues,
            })
          }
        >
          <Text style={styles.addButtonText}>Add as New Patient</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#151a1e" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  content: {
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

  addButton: {
    backgroundColor: "#cedfed",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },
  addButtonText: {
    color: "#151a1e",
    fontSize: 16,
    fontWeight: "700",
  },
});
