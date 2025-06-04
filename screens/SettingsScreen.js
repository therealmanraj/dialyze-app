// screens/SettingsScreen.js
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <SafeAreaView
      style={styles.root}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialyze</Text>
      </View>
      <Text style={styles.pageTitle}>Settings</Text>
      <Text style={styles.pageSub}>
        Change the settings of the app using this screen.
      </Text>

      <ScrollView contentContainerStyle={styles.content}>
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

        <Text style={styles.sectionHeading}>About</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>1.0.0</Text>
        </View>

        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <Text style={styles.label}>Terms of Service</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#9eafbd"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <Text style={styles.label}>Privacy Policy</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#9eafbd"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#151a1e",
  },
  header: {
    backgroundColor: "#151a1e",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  pageTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  pageSub: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
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
