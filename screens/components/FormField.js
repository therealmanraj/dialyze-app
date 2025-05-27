// screens/components/FormField.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
  style,
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#91b0ca"
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 16 },
  label: { color: "#fff", fontSize: 16, marginBottom: 4 },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
  },
});
