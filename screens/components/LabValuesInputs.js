import React from "react";
import { View, StyleSheet } from "react-native";
import FormField from "./FormField";

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
  return (
    <View>
      {LAB_FIELDS.map((key) => (
        <FormField
          key={key}
          label={key}
          placeholder="Enter value"
          keyboardType="numeric"
          value={labValues[key] ?? ""}
          onChangeText={(text) => setLabValues({ ...labValues, [key]: text })}
        />
      ))}
    </View>
  );
}
