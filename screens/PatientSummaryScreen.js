// screens/PatientSummaryScreen.js
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ProfileHeader from "./PatientSummaryScreen/components/ProfileHeader";
import ClinicalInfoSection from "./PatientSummaryScreen/components/ClinicalInfoSection";
import RiskSection from "./PatientSummaryScreen/components/RiskSection";
import LabTrendsSection from "./PatientSummaryScreen/components/LabTrendsSection";

export default function PatientSummaryScreen({ route, navigation }) {
  const { patient } = route.params;

  // example labValues; you’ll want to pull these from your real data
  const labValues = [
    { label: "Creatinine", value: "2.5 mg/dL" },
    { label: "BUN", value: "40 mg/dL" },
    { label: "Potassium", value: "5.2 mEq/L" },
    { label: "Sodium", value: "138 mEq/L" },
    { label: "Bicarbonate", value: "22 mEq/L" },
    { label: "Urine Output", value: "500 mL/day" },
  ];

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Summary</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile */}
        <ProfileHeader
          avatar={patient.avatar}
          name={patient.name}
          id={patient.id}
          details={patient.details}
        />

        {/* Clinical Info */}
        <ClinicalInfoSection
          data={[
            { label: "Weight", value: "75 kg" },
            { label: "Height", value: "175 cm" },
            { label: "BMI", value: "24.5" },
            { label: "BSA", value: "1.8 m²" },
            { label: "Age", value: "65" },
            { label: "Gender", value: "Male" },
          ]}
          onUpdate={() => navigation.navigate("UpdateClinicalInfo")}
        />

        {/* Risk Section */}
        <RiskSection
          akiRisk={[
            { label: "Risk Score", value: "15%" },
            { label: "Risk Level", value: "Low" },
          ]}
          dialysisNeed={[{ label: "Probability", value: "5%" }]}
        />

        {/* —— NEW: Lab Values Grid —— */}
        <Text style={styles.sectionTitle}>Lab Values</Text>
        <View style={styles.grid}>
          {labValues.map((item) => (
            <View key={item.label} style={styles.cell}>
              <Text style={styles.cellLabel}>{item.label}</Text>
              <Text style={styles.cellValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* (Optional) Lab Trends Chart */}
        <LabTrendsSection
          metric="Creatinine"
          value="1.2 mg/dL"
          changePct="+10%"
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          data={[80, 95, 60, 75, 100, 85, 90]}
        />
      </ScrollView>

      {/* —— UPDATED BUTTON —— */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() =>
            navigation.navigate("UpdatePrediction", {
              /* pass along whatever data UpdatePredictionScreen needs */
            })
          }
        >
          <Text style={styles.updateButtonText}>Update Predictions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#151a1e" },
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

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
  },
  cell: {
    width: "50%",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#3e4e5b",
    paddingHorizontal: 8,
  },
  cellLabel: { color: "#9eafbd", fontSize: 14 },
  cellValue: { color: "#fff", fontSize: 14, marginTop: 4 },

  footer: {
    padding: 16,
    backgroundColor: "#151a1e",
  },
  updateButton: {
    backgroundColor: "#cedfed",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#151a1e",
    fontSize: 16,
    fontWeight: "700",
  },
});
