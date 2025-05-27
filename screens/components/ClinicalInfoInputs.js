// screens/components/ClinicalInfoInputs.js
import React, { useEffect } from "react";
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  }

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

      {/* Here’s the magic: 
          parent row is just flexDirection: 'row',
          each child wrapper is flex:1 */}
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
          <FormField
            label="Gender"
            placeholder="Enter gender"
            value={gender}
            onChangeText={setGender}
          />
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
});
