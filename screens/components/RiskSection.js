// components/RiskSection.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RiskSection({ akiRisk, dialysisNeed }) {
  return (
    <View style={{ marginTop: 24 }}>
      <Text style={styles.title}>AKI Risk</Text>
      <View style={styles.row}>
        {akiRisk.map((r, i) => (
          <View
            key={r.label}
            style={[styles.card, i < akiRisk.length - 1 && { marginRight: 8 }]}
          >
            <Text style={styles.cardLabel}>{r.label}</Text>
            <Text style={styles.cardValue}>{r.value}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.title, { marginTop: 24 }]}>Dialysis Need</Text>
      <View style={styles.row}>
        {dialysisNeed.map((d, i) => (
          <View
            key={d.label}
            style={[
              styles.card,
              i < dialysisNeed.length - 1 && { marginRight: 8 },
            ]}
          >
            <Text style={styles.cardLabel}>{d.label}</Text>
            <Text style={styles.cardValue}>{d.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
  },
  row: { flexDirection: "row", marginHorizontal: 16 },
  card: {
    flex: 1,
    minWidth: 158,
    backgroundColor: "#2b3740",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  cardLabel: { color: "#fff", fontSize: 16 },
  cardValue: { color: "#fff", fontSize: 24, fontWeight: "700", marginTop: 8 },
});
