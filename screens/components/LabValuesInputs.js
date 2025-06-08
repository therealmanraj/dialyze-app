// screens/components/LabValuesInputs.js
import React from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

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

export default function LabValuesInputs({ labValues, setLabValues }) {
  const pairs = [];
  for (let i = 0; i < LAB_FIELDS.length; i += 2) {
    pairs.push([LAB_FIELDS[i], LAB_FIELDS[i + 1]]);
  }

  return (
    <View style={styles.container}>
      {pairs.map(([leftKey, rightKey], idx) => (
        <View key={idx} style={styles.twoColRow}>
          <SingleLabInput
            label={leftKey}
            unit={UNIT_MAP[leftKey] || ""}
            rawValue={labValues[leftKey] ?? ""}
            onRawChange={(newRaw) =>
              setLabValues({ ...labValues, [leftKey]: newRaw })
            }
            style={[styles.col, styles.colRightGutter]}
          />

          {rightKey ? (
            <SingleLabInput
              label={rightKey}
              unit={UNIT_MAP[rightKey] || ""}
              rawValue={labValues[rightKey] ?? ""}
              onRawChange={(newRaw) =>
                setLabValues({ ...labValues, [rightKey]: newRaw })
              }
              style={styles.col}
            />
          ) : (
            <View style={styles.col} />
          )}
        </View>
      ))}
    </View>
  );
}

function SingleLabInput({ label, unit, rawValue, onRawChange, style }) {
  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.inputBox, unit ? { paddingRight: 60 } : {}]}
          keyboardType="numeric"
          placeholder={unit ? `e.g. 0.00` : "Enter value"}
          placeholderTextColor="#91b0ca"
          value={rawValue}
          onChangeText={(text) => {
            const filtered = text.replace(/[^0-9.]/g, "");
            onRawChange(filtered);
          }}
          returnKeyType="done"
        />
        {unit && <Text style={styles.unitText}>{unit}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },

  twoColRow: {
    flexDirection: "row",
  },

  col: {
    flex: 1,
  },
  colRightGutter: {
    marginRight: 16,
  },

  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputBox: {
    flex: 1,
    height: 56,
    backgroundColor: "#233748",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
    ...Platform.select({
      ios: { paddingVertical: 14 },
      android: {},
    }),
  },

  unitText: {
    position: "absolute",
    right: 16,
    color: "#9eafbd",
    fontSize: 16,
  },
});
