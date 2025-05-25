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
import BottomTabBar from "../components/BottomTabBar";

export default function PredictionOutcomeScreen({ navigation, route }) {
  // you passed these in handlePredict
  const { akiRisk, dialysisNeed } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialyze</Text>
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
          onPress={() => {
            navigation.navigate("AddPatient");
          }}
        >
          <Text style={styles.addButtonText}>Add as New Patient</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom nav */}
      <BottomTabBar activeTab="Predictions" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#151a1e",
  },
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
