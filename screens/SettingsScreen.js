// screens/SettingsScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTabBar from "./components/BottomTabBar";

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* General */}
        <Text style={styles.sectionHeading}>General</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>English</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Appearance</Text>
          <Text style={styles.value}>System</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        {/* About */}
        <Text style={styles.sectionHeading}>About</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            /* TODO: nav to TOS */
          }}
        >
          <Text style={styles.label}>Terms of Service</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#9eafbd"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            /* TODO: nav to Privacy */
          }}
        >
          <Text style={styles.label}>Privacy Policy</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#9eafbd"
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom tabs */}
      <BottomTabBar activeTab="Settings" navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#151a1e",
  },
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
    paddingBottom: 24,
  },
  sectionHeading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#3e4e5b",
  },
  label: {
    color: "#fff",
    fontSize: 16,
  },
  value: {
    color: "#9eafbd",
    fontSize: 16,
  },
});
