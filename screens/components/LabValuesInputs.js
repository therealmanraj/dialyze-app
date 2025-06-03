// screens/components/LabValuesInputs.js
import React from "react";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

/**
 * 1) Define a simple lookup from each lab field to its unit string
 *    (same as before).
 */
const UNIT_MAP = {
  HCO3: "mEq/L",
  Creatinine: "mg/dL",
  "Mean Arterial Pressure": "mmHg",
  Procalcitonin: "ng/mL",
  Bilirubin: "mg/dL",
  pH: "", // no unit
  Albumin: "g/dL",
  Urea: "mg/dL",
  "White Blood Cell Count": "×10³/µL",
  SOFA: "points",
  APACHEII: "points",
  Glasgow: "points",
};

/**
 * 2) The list of fields (unchanged).
 */
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

/**
 * Props:
 *   - labValues:   an object, e.g. { Creatinine: "1.2", … }
 *   - setLabValues: (newObj) => void  — updates the parent state
 */
export default function LabValuesInputs({ labValues, setLabValues }) {
  // 3) Build an array of “pairs” so we can render two inputs per row.
  //    If there is an odd number of fields, the last row’s second column
  //    will simply be an empty View.
  const pairs = [];
  for (let i = 0; i < LAB_FIELDS.length; i += 2) {
    const firstKey = LAB_FIELDS[i];
    const secondKey = LAB_FIELDS[i + 1]; // might be undefined if length is odd
    pairs.push([firstKey, secondKey]);
  }

  return (
    <View style={styles.container}>
      {pairs.map(([leftKey, rightKey], idx) => (
        <View key={idx} style={styles.row}>
          {/* Left input */}
          <SingleLabInput
            label={leftKey}
            unit={UNIT_MAP[leftKey] || ""}
            rawValue={labValues[leftKey] ?? ""}
            onRawChange={(newRaw) => {
              setLabValues({ ...labValues, [leftKey]: newRaw });
            }}
            style={styles.half} // take up 50% of row
          />

          {/* Right input (if it exists) */}
          {rightKey ? (
            <SingleLabInput
              label={rightKey}
              unit={UNIT_MAP[rightKey] || ""}
              rawValue={labValues[rightKey] ?? ""}
              onRawChange={(newRaw) => {
                setLabValues({ ...labValues, [rightKey]: newRaw });
              }}
              style={[styles.half, styles.rightGap]}
            />
          ) : (
            // If there’s no second field (odd count), render an invisible placeholder
            <View style={styles.half} />
          )}
        </View>
      ))}
    </View>
  );
}

/**
 * Renders one column “lab” input: a label + text‐input + static unit on the right.
 *
 * Props:
 *   - label:      string (e.g. "Creatinine")
 *   - unit:       string (e.g. "mg/dL") or "" if none
 *   - rawValue:   string (only digits/decimal), e.g. "1.2"
 *   - onRawChange: fn(newRaw: string) => void
 *   - style:      any style to apply to the outer container (e.g. { flex: 1 })
 */
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
            // Strip out any characters that aren’t digits or a decimal point:
            const filtered = text.replace(/[^0-9.]/g, "");
            onRawChange(filtered);
          }}
          returnKeyType="done"
        />
        {unit ? <Text style={styles.unitText}>{unit}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 24,
  },

  // Each “row” holds two inputs side by side.
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },

  // Each input’s container should take up half the width of the row.
  half: {
    flex: 1,
  },
  // Small gap between left & right column
  rightGap: {
    marginLeft: 8,
  },

  // ── SingleLabInput Styles ──────────────────────────────────────

  fieldContainer: {
    // marginBottom is handled by the parent .row’s marginBottom,
    // so we don’t need it here.
  },
  fieldLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },

  // Wraps the TextInput + optional unit label:
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputBox: {
    flex: 1,
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,

    // Vertically center text on iOS:
    ...Platform.select({
      ios: { paddingVertical: 14 },
      android: {},
    }),
  },

  // The unit is absolutely positioned inside the same container,
  // pinned to the right.
  unitText: {
    position: "absolute",
    right: 16,
    color: "#9eafbd",
    fontSize: 16,
  },
});
