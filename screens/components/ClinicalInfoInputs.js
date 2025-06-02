// screens/components/ClinicalInfoInputs.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
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
}) {
  // Local state to toggle the Gender dropdown
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
    // ←── REPLACED with the “working” code:
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

  // Hard‐coded gender options
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

      {/* Age & Gender Row */}
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

          {/* ── CUSTOM DROPDOWN FOR GENDER ──────────────────────────── */}
          <View>
            {/* The visible “button” that shows current value or placeholder */}
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowGenderOptions((prev) => !prev)}
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
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>

            {/* The list of options, shown only when showGenderOptions===true */}
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
      </View>

      {/* Height & Weight Row */}
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

  // ─── DROPDOWN “BUTTON” (always visible) ─────────────────────────
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
  placeholderText: {
    color: "#9eafbd", // lighter color when no selection
  },
  dropdownIcon: {
    marginLeft: 8,
  },

  // ─── DROPDOWN LIST (only when showGenderOptions===true) ───────────
  dropdownListContainer: {
    position: "absolute",
    top: 56, // drop below the “button” by its height
    left: 0,
    right: 0,
    backgroundColor: "#233748",
    borderRadius: 8,
    marginTop: 4,
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
