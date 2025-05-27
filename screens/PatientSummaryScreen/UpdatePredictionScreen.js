// screens/UpdatePredictionScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LabValuesInputs from "../components/LabValuesInputs";

export default function UpdatePredictionScreen({ navigation, route }) {
  // you could seed initial values from route.params.labValues if you like:
  const initial = route.params?.labValues || {};
  const [labValues, setLabValues] = useState(initial);

  function handleUpdate() {
    // TODO: re-run your prediction using labValues…
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* —— header —— */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Lab Values</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* —— lifts form + footer above keyboard —— */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* === all your lab fields come from LabValuesInputs === */}
          <LabValuesInputs labValues={labValues} setLabValues={setLabValues} />
        </ScrollView>

        {/* —— always‐visible “Update” button —— */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#111a22",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#111a22",
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: "#111a22",
  },
  updateButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
