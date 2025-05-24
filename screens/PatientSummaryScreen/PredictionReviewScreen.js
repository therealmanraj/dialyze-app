// screens/PredictionReviewScreen.js
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
import ProfileHeader from "../components/PatientSummaryScreen/ProfileHeader";

export default function PredictionReviewScreen({ route, navigation }) {
  // pull in everything you passed when you navigated:
  const { patient, prediction, clinicalInfo, labValues } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      {/* — Header with back arrow — */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* — Profile block — */}
        <ProfileHeader
          avatar={patient.avatar}
          name={patient.name}
          id={patient.id}
          details={patient.details}
        />

        {/* — AKI Risk Prediction — */}
        <Text style={styles.sectionTitle}>AKI Risk Prediction</Text>
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>AKI Risk</Text>
            <Text style={styles.cardValue}>{prediction.akiRisk}</Text>
          </View>
        </View>

        {/* — Dialysis Need — */}
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Dialysis Need</Text>
            <Text style={styles.cardValue}>{prediction.dialysisNeed}</Text>
          </View>
        </View>

        {/* — Lab Values grid — */}
        <Text style={styles.sectionTitle}>Lab Values</Text>
        <View style={styles.grid}>
          {labValues.map((item) => (
            <View key={item.label} style={styles.cell}>
              <Text style={styles.cellLabel}>{item.label}</Text>
              <Text style={styles.cellValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* — Update Prediction button — */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            /* push to your “Update Prediction” form */
          }}
        >
          <Text style={styles.updateButtonText}>Update Prediction</Text>
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

  scroll: {
    paddingBottom: 40,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },

  cardsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "#2b3740",
    borderRadius: 12,
    padding: 16,
  },
  cardLabel: { color: "#fff", fontSize: 16 },
  cardValue: { color: "#fff", fontSize: 24, fontWeight: "700", marginTop: 8 },

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
