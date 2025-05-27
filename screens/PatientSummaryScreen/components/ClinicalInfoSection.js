// components/ClinicalInfoSection.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ClinicalInfoSection({ data, onUpdate }) {
  return (
    <View style={{ marginTop: 24 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Clinical Information</Text>
        <TouchableOpacity onPress={onUpdate} style={styles.btn}>
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {data.map((c) => (
          <View key={c.label} style={styles.cell}>
            <Text style={styles.label}>{c.label}</Text>
            <Text style={styles.value}>{c.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700" },
  btn: {
    backgroundColor: "#2b3740",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  btnText: { color: "#fff", fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: 16 },
  cell: {
    width: "50%",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#3e4e5b",
  },
  label: { color: "#9eafbd", fontSize: 14 },
  value: { color: "#fff", fontSize: 14, marginTop: 4 },
});
