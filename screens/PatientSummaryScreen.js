import React from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ProfileHeader from "./PatientSummaryScreen/components/ProfileHeader";
import ClinicalInfoSection from "./PatientSummaryScreen/components/ClinicalInfoSection";
import RiskSection from "./PatientSummaryScreen/components/RiskSection";
import LabTrendsSection from "./PatientSummaryScreen/components/LabTrendsSection";

export default function PatientSummaryScreen({ route, navigation }) {
  const { patient } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Summary</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <ProfileHeader
          avatar={patient.avatar}
          name={patient.name}
          id="123456789"
          details={patient.details}
        />

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

        <RiskSection
          akiRisk={[
            { label: "Risk Score", value: "15%" },
            { label: "Risk Level", value: "Low" },
          ]}
          dialysisNeed={[{ label: "Probability", value: "5%" }]}
        />

        <LabTrendsSection
          metric="Creatinine"
          value="1.2 mg/dL"
          changePct="+10%"
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          data={[80, 95, 60, 75, 100, 85, 90]}
        />
      </ScrollView>

      {/* Predict button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.predictButton}
          onPress={() =>
            navigation.navigate("PredictionReview", {
              patient: {
                avatar: patient.avatar,
                name: patient.name,
                id: patient.id,
                details: patient.details,
              },
              prediction: {
                akiRisk: "High (85%)",
                dialysisNeed: "Likely (60%)",
              },
              clinicalInfo: [
                { label: "Admission Date", value: "2024-07-26" },
                { label: "Primary Diagnosis", value: "Sepsis" },
                { label: "Comorbidities", value: "Hypertension, Diabetes" },
                { label: "Medications", value: "Insulin, Metformin" },
                { label: "Allergies", value: "Penicillin" },
                { label: "Code Status", value: "Full Code" },
              ],
              labValues: [
                { label: "Creatinine", value: "2.5 mg/dL" },
                { label: "BUN", value: "40 mg/dL" },
                { label: "Potassium", value: "5.2 mEq/L" },
                { label: "Sodium", value: "138 mEq/L" },
                { label: "Bicarbonate", value: "22 mEq/L" },
                { label: "Urine Output", value: "500 mL/day" },
              ],
            })
          }
        >
          <Text style={styles.predictText}>Predict</Text>
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
  predictButton: {
    backgroundColor: "#cedfed",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },
  predictText: {
    color: "#151a1e",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    padding: 16,
    backgroundColor: "#151a1e",
  },
});
