// screens/PatientSummaryScreen.js
import React, { useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PatientsContext } from "../contexts/PatientsContext";
import ProfileHeader from "./components/ProfileHeader";
import ClinicalInfoSection from "./components/ClinicalInfoSection";
import RiskSection from "./components/RiskSection";
import LabTrendsSection from "./components/LabTrendsSection";
import { SafeAreaView } from "react-native-safe-area-context";

const UNIT_MAP = {
  HCO3: "mEq/L",
  Creatinine: "mg/dL",
  "Mean Arterial Pressure": "mmHg",
  Procalcitonin: "ng/mL",
  Bilirubin: "mg/dL",
  pH: "",
  Albumin: "g/dL",
  Urea: "mg/dL",
  "White Blood Cell Count": "×10³/µL",
  SOFA: "points",
  APACHEII: "points",
  Glasgow: "points",
};

const LAB_FIELDS = [
  "HCO3",
  "Creatinine",
  "Mean Arterial Pressure",
  "Procalcitonin",
  "Bilirubin",
  "pH",
  "Albumin",
  "Urea",
  "White Blood Cell Count",
  "SOFA",
  "APACHEII",
  "Glasgow",
];

export default function PatientSummaryScreen({ route, navigation }) {
  const { patientId } = route.params;
  const { patients } = useContext(PatientsContext);
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return (
      <SafeAreaView
        style={styles.root}
        edges={["top", "left", "right", "bottom"]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Patient not found</Text>
          <View style={{ width: 24 }} />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#fff" }}>No such patient.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const weightStr = patient.clinical?.weight || "";
  const heightStr = patient.clinical?.height || "";
  const weightNum = parseFloat(weightStr);
  const heightNumCm = parseFloat(heightStr);

  let bmiDisplay = "—";
  if (!isNaN(weightNum) && !isNaN(heightNumCm) && heightNumCm > 0) {
    const heightMeters = heightNumCm / 100;
    const rawBmi = weightNum / (heightMeters * heightMeters);
    bmiDisplay = rawBmi.toFixed(1);
  }

  const labValuesObject = patient.labValues || {};

  const allLabsFilled = LAB_FIELDS.every((key) => {
    const v = labValuesObject[key];
    return typeof v === "string" && v.trim() !== "";
  });

  const buttonLabel = allLabsFilled ? "Update Predictions" : "Add Lab Values";
  const buttonAction = () => {
    navigation.navigate("UpdatePrediction", {
      patientId: patient.id,
      labValues: patient.labValues,
    });
  };

  return (
    <SafeAreaView
      style={styles.root}
      edges={["top", "left", "right", "bottom"]}
    >
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
          id={patient.id}
          details={patient.details}
        />

        <ClinicalInfoSection
          data={[
            { label: "Weight", value: `${weightStr} kg` },
            { label: "Height", value: `${heightStr} cm` },
            { label: "BMI", value: bmiDisplay },
            { label: "Age", value: patient.clinical.age },
            { label: "Gender", value: patient.clinical.gender },
            { label: "Notes", value: patient.clinical.notes || "—" },
          ]}
          onUpdate={() =>
            navigation.navigate("UpdateClinicalInfo", { patientId: patient.id })
          }
        />

        <RiskSection
          akiRisk={[
            { label: "Risk Score", value: patient.riskPct },
            { label: "Risk Level", value: patient.riskLabel },
          ]}
          dialysisNeed={[{ label: "Probability", value: "—" }]}
        />

        <Text style={styles.sectionTitle}>Lab Values</Text>
        <View style={styles.grid}>
          {Object.entries(labValuesObject).map(([labKey, labVal]) => {
            const unit = UNIT_MAP[labKey] || "";
            const displayValue = labVal
              ? unit
                ? `${labVal} ${unit}`
                : `${labVal}`
              : "—";

            return (
              <View key={labKey} style={styles.cell}>
                <Text style={styles.cellLabel}>{labKey}</Text>
                <Text style={styles.cellValue}>{displayValue}</Text>
              </View>
            );
          })}
        </View>

        <LabTrendsSection
          metric="Creatinine"
          value={patient.labValues.Creatinine || "—"}
          changePct="+10%"
          labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          data={[80, 95, 60, 75, 100, 85, 90]}
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.updateButton} onPress={buttonAction}>
          <Text style={styles.updateButtonText}>{buttonLabel}</Text>
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
  cellLabel: {
    color: "#9eafbd",
    fontSize: 14,
  },
  cellValue: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },

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
