// screens/PredictionOutcomeScreen.js
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

export default function PredictionOutcomeScreen({ navigation, route }) {
  const { akiRisk, dialysisNeed, labValues } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dialyze</Text>
        {/* spacer to center the title */}
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Prediction Outcome</Text>
        <Text style={styles.subtitle}>
          Based on the entered lab values, the predicted risk of Acute Kidney
          Injury is {akiRisk}, and the likelihood of needing dialysis is{" "}
          {dialysisNeed}.
        </Text>

        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>AKI Risk</Text>
            <Text style={styles.cardValue}>{akiRisk}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Dialysis Need</Text>
            <Text style={styles.cardValue}>{dialysisNeed}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddPatient", {
              akiRisk,
              dialysisNeed,
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
    justifyContent: "space-between", // <--- distribute back/title/spacer
    alignItems: "center",
    padding: 16,
    backgroundColor: "#151a1e",
  },
  headerTitle: {
    flex: 1, // <--- take up all remaining space
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center", // <--- center within that space
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
  cardsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    flex: 1,
    minWidth: 158,
    backgroundColor: "#2b3740",
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
  },
  cardLabel: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  cardValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
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
