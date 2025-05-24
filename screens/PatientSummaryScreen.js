// screens/PatientSummaryScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function PatientSummaryScreen({ route, navigation }) {
  const { patient } = route.params;

  // you can replace these with real data later
  const clinicalInfo = [
    { label: "Weight", value: "75 kg" },
    { label: "Height", value: "175 cm" },
    { label: "BMI", value: "24.5" },
    { label: "BSA", value: "1.8 m²" },
    { label: "Age", value: "65" },
    { label: "Gender", value: "Male" },
  ];

  const akiRisk = [
    { label: "Risk Score", value: "15%" },
    { label: "Risk Level", value: "Low" },
  ];

  const dialysisNeed = [{ label: "Probability", value: "5%" }];

  const labMetric = "Creatinine";
  const currentValue = "1.2 mg/dL";
  const changePercent = "+10%";

  const labLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const labData = [80, 95, 60, 75, 100, 85, 90]; // replace with your real values

  return (
    <SafeAreaView style={styles.root}>
      {/* Header with back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Summary</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile */}
        <View style={styles.profileRow}>
          <Image source={{ uri: patient.avatar }} style={styles.largeAvatar} />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{patient.name}</Text>
            <Text style={styles.profileMeta}>ID: 123456789</Text>
            <Text style={styles.profileMeta}>{patient.details}</Text>
          </View>
        </View>

        {/* Clinical Info */}
        <Section
          title="Clinical Information"
          buttonLabel="Update"
          onPress={() => {}}
        >
          <View style={styles.grid}>
            {clinicalInfo.map((c) => (
              <View key={c.label} style={styles.cell}>
                <Text style={styles.cellLabel}>{c.label}</Text>
                <Text style={styles.cellValue}>{c.value}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* AKI Risk */}
        <Section title="AKI Risk">
          <View style={styles.cardsRow}>
            {akiRisk.map((r) => (
              <View key={r.label} style={styles.card}>
                <Text style={styles.cardLabel}>{r.label}</Text>
                <Text style={styles.cardValue}>{r.value}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Dialysis Need */}
        <Section title="Dialysis Need">
          <View style={styles.cardsRow}>
            {dialysisNeed.map((d) => (
              <View key={d.label} style={styles.card}>
                <Text style={styles.cardLabel}>{d.label}</Text>
                <Text style={styles.cardValue}>{d.value}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Lab Trends Placeholder */}
        <Section title="Recent Lab Trends">
          {/* —— add metric & change above chart —— */}
          <View style={styles.labHeader}>
            <Text style={styles.labMetricLabel}>{labMetric}</Text>
            <Text style={styles.labMetricValue}>{currentValue}</Text>
            <Text style={styles.labMetricChange}>
              Last 7 Days{" "}
              <Text style={styles.labMetricChangePct}>{changePercent}</Text>
            </Text>
          </View>
          <LineChart
            data={{
              labels: labLabels,
              datasets: [{ data: labData }],
            }}
            width={Dimensions.get("window").width - 32} // full width minus padding
            height={180}
            yAxisSuffix=" mg/dL"
            chartConfig={{
              backgroundGradientFrom: "#151a1e",
              backgroundGradientTo: "#151a1e",
              color: (opacity = 1) => `rgba(158, 175, 189, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(158, 175, 189, ${opacity})`,
              propsForDots: { r: "3", strokeWidth: "1", stroke: "#cedfed" },
            }}
            style={{ marginVertical: 8, borderRadius: 12 }}
            bezier
          />
        </Section>
      </ScrollView>

      {/* Predict button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.predictButton}>
          <Text style={styles.predictText}>Predict</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Section({ title, buttonLabel, onPress, children }) {
  return (
    <View style={{ marginTop: 24 }}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {buttonLabel && (
          <TouchableOpacity onPress={onPress} style={styles.updateBtn}>
            <Text style={styles.updateTxt}>{buttonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
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
  container: { paddingBottom: 40 },
  profileRow: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  largeAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#333",
  },
  profileText: { marginLeft: 16 },
  profileName: { color: "#fff", fontSize: 22, fontWeight: "700" },
  profileMeta: { color: "#9eafbd", fontSize: 14, marginTop: 4 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  updateBtn: {
    backgroundColor: "#2b3740",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  updateTxt: { color: "#fff", fontWeight: "600" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
  },
  cell: {
    width: "50%",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#3e4e5b",
  },
  cellLabel: { color: "#9eafbd", fontSize: 14 },
  cellValue: { color: "#fff", fontSize: 14, marginTop: 4 },

  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    minWidth: 158,
    backgroundColor: "#2b3740",
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  cardLabel: { color: "#fff", fontSize: 16 },
  cardValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },

  labHeader: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  labMetricLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  labMetricValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 4,
  },
  labMetricChange: {
    color: "#9eafbd",
    fontSize: 14,
    marginTop: 2,
  },
  labMetricChangePct: {
    color: "#0bda5b",
    fontWeight: "600",
  },

  footer: {
    padding: 16,
    backgroundColor: "#151a1e",
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
});
