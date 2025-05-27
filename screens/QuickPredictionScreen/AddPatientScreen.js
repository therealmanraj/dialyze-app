// screens/AddPatientScreen.js
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
import ClinicalInfoInputs from "../components/ClinicalInfoInputs";

export default function AddPatientScreen({ navigation }) {
  const [clin, setClin] = useState({
    name: "",
    photoUri: null,
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  function handleAdd() {
    // TODO: persist patient (clin)
    navigation.navigate("MainTabs", { screen: "Home" });
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dialyze</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* form */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Add Patient Details</Text>

          <ClinicalInfoInputs
            name={clin.name}
            setName={(v) => setClin({ ...clin, name: v })}
            photoUri={clin.photoUri}
            setPhotoUri={(uri) => setClin({ ...clin, photoUri: uri })}
            age={clin.age}
            setAge={(v) => setClin({ ...clin, age: v })}
            gender={clin.gender}
            setGender={(v) => setClin({ ...clin, gender: v })}
            height={clin.height}
            setHeight={(v) => setClin({ ...clin, height: v })}
            weight={clin.weight}
            setWeight={(v) => setClin({ ...clin, weight: v })}
          />
        </ScrollView>

        {/* footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Save Patient</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: "#151a1e",
  },
  addButton: {
    backgroundColor: "#cedfed",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#151a1e",
    fontSize: 16,
    fontWeight: "700",
  },
});
