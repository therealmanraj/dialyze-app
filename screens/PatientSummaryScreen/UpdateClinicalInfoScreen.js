// screens/UpdateClinicalInfoScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function UpdateClinicalInfoScreen({ navigation }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleUpdate = () => {
    // TODO: persist values…
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Clinical Information</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {/* Weight */}
        <View style={styles.field}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight"
            placeholderTextColor="#9eafbd"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        {/* Height */}
        <View style={styles.field}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter height"
            placeholderTextColor="#9eafbd"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>

        {/* Age */}
        <View style={styles.field}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter age"
            placeholderTextColor="#9eafbd"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        {/* Gender */}
        <View style={styles.field}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gender}
              onValueChange={setGender}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Select gender" value="" color="#9eafbd" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>
      </ScrollView>

      {/* Update button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>

      {/* Bottom Tabs (copy your existing tab bar) */}
      {/* <View style={styles.tabBar}>
        {[
          { name: "Home", icon: "home", route: "Home" },
          {
            name: "Predictions",
            icon: "account-multiple-outline",
            route: "Home",
          },
          { name: "Settings", icon: "cog-outline", route: "Home" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => navigation.navigate(tab.route)}
          >
            <MaterialCommunityIcons name={tab.icon} size={24} color="#9eafbd" />
            <Text style={styles.tabText}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
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
  form: { paddingHorizontal: 16, paddingBottom: 16 },
  field: { marginBottom: 20 },
  label: { color: "#fff", fontSize: 16, fontWeight: "500", marginBottom: 6 },
  input: {
    backgroundColor: "#2b3740",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#fff",
  },
  pickerWrapper: {
    backgroundColor: "#2b3740",
    borderRadius: 12,
    overflow: "hidden",
  },
  picker: {
    color: "#fff",
  },
  updateButton: {
    backgroundColor: "#6270ea",
    margin: 16,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1f272e",
    borderTopColor: "#2b3740",
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabText: { color: "#9eafbd", fontSize: 12, marginTop: 2 },
});
