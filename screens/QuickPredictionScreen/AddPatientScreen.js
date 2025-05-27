// screens/AddPatientScreen.js
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function AddPatientScreen({ navigation }) {
  const [name, setName] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [creatinine, setCreatinine] = useState("");
  const [urineOutput, setUrineOutput] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // request permissions for camera roll
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to add a photo!");
        }
      }
    })();
  }, []);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  }

  function handleAdd() {
    // TODO: validate & save the new patient
    navigation.navigate("MainTabs", { screen: "Home" });
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* fixed header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dialyze</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* inputs + footer slide up */}
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

          {/* Patient Name */}
          <TextInput
            style={styles.input}
            placeholder="Patient Name"
            placeholderTextColor="#9eafbd"
            value={name}
            onChangeText={setName}
          />

          {/* Photo picker */}
          <TouchableOpacity style={styles.photoRow} onPress={pickImage}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color="#fff"
                style={styles.photoIcon}
              />
            )}
            <Text style={styles.photoText}>
              {photoUri ? "Change Photo" : "Add Patient Photo"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Clinical Information</Text>

          {/* Clinical fields */}
          <TextInput
            style={styles.input}
            placeholder="Creatinine (mg/dL)"
            placeholderTextColor="#9eafbd"
            value={creatinine}
            onChangeText={setCreatinine}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Urine Output (mL/day)"
            placeholderTextColor="#9eafbd"
            value={urineOutput}
            onChangeText={setUrineOutput}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Age (years)"
            placeholderTextColor="#9eafbd"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            placeholderTextColor="#9eafbd"
            value={gender}
            onChangeText={setGender}
          />
        </ScrollView>

        {/* always-visible footer button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
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

  input: {
    backgroundColor: "#2b3740",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
    marginVertical: 8,
  },

  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2b3740",
    borderRadius: 12,
    height: 56,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  photoIcon: { marginRight: 12 },
  photo: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  photoText: { color: "#fff", fontSize: 16 },

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 8,
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
