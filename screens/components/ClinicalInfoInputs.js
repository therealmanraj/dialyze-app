// screens/components/ClinicalInfoInputs.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FormField from "./FormField";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ClinicalInfoInputs({
  name,
  setName,
  photoUri,
  setPhotoUri,
  age,
  setAge,
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  notes,
  setNotes,
}) {
  const [showGenderOptions, setShowGenderOptions] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Need photo permissions to add a picture");
        }
      }
    })();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  const GENDER_OPTIONS = ["Male", "Female", "Other"];

  return (
    <View style={styles.container}>
      <FormField
        label="Patient Name"
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

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
          {photoUri ? "Change Photo" : "Add Photo"}
        </Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.half}>
          <FormField
            label="Age (years)"
            placeholder="Enter age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>
        <View style={[styles.half, styles.rightGap]}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowGenderOptions((v) => !v)}
          >
            <Text
              style={[
                styles.dropdownButtonText,
                !gender && styles.placeholderText,
              ]}
            >
              {gender || "Select gender"}
            </Text>
            <MaterialCommunityIcons
              name={showGenderOptions ? "chevron-up" : "chevron-down"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
          {showGenderOptions && (
            <View style={styles.dropdownListContainer}>
              {GENDER_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGender(opt);
                    setShowGenderOptions(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.half}>
          <FormField
            label="Height (cm)"
            placeholder="Enter height"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>
        <View style={[styles.half, styles.rightGap]}>
          <FormField
            label="Weight (kg)"
            placeholder="Enter weight"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Clinical Notes</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter clinical notes"
        placeholderTextColor="#91b0ca"
        multiline
        value={notes}
        onChangeText={setNotes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  half: {
    flex: 1,
  },
  rightGap: {
    marginLeft: 8,
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  photoIcon: { marginRight: 12 },
  photo: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  photoText: { color: "#fff", fontSize: 16 },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#233748",
    borderRadius: 12,
    paddingHorizontal: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  placeholderText: {
    color: "#9eafbd",
  },
  dropdownButton: {
    backgroundColor: "#233748",
    borderRadius: 12,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  dropdownButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  dropdownListContainer: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: "#233748",
    borderRadius: 8,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e2a36",
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 16,
  },
});
