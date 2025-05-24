// screens/HomeScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DEMO_PATIENTS = [
  {
    id: "1",
    name: "Ethan Carter",
    details: "Age: 65, Male",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxlcPx1dh-l8uhb9AvXQovks5QvuaDw8nQlNHdEw_ih_jmt_2yAteEVaYa_QoEYS2XdZP9qbacppKkhvpbjflNr5hFfJUesihfdQQYkAYqCiNI5UvX_0bVNf1xIMQhz2xoLLJH7iD98IGVJhWnK4KGLaZ7zqs2wEWexXOJNMXOiy4fb6iidqojcOZhk_0jKQHefiuQZ474WDRqZA_xlK48aEtbPm4-lIkL9ObBX_ip1h4feAHQb58WPaw4NLs-B7A4cwKjVCcvnE",
    riskLabel: "Medium",
    riskPct: "50%",
    riskColor: "#0bda5b",
  },
  {
    id: "2",
    name: "Sophia Clark",
    details: "Age: 72, Female",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OboGcvAk2beHqEABPJ8Z-O-qesZemOu11NYQidOkhTrQ-pU_fCa1ZMirdpiQKTD9FceLQOQn0E2i0sS2SuqTColDfZz_oCczDvgLgleKYn9vijRA64GaNSqw9fv0Eg-2zeg-OMsi1oj6_jZ94Zms60Fon893UgswtZCEkqv7oobFaQRkTcty47mBJcPvzm-WCHCyvUxuT5MYFviOdfG2nqOZe-CjU9KxCgDtnIbnFnvgvoInzIWCxZEglukRqJu-KsDwwe4WIiA",
    riskLabel: "High",
    riskPct: "90%",
    riskColor: "#e33e3e",
  },
  // …and so on
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const filtered = DEMO_PATIENTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* Top bar + title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialyze</Text>
      </View>
      <Text style={styles.pageTitle}>Welcome to Dialyze</Text>
      <Text style={styles.pageSub}>
        Explore the app’s functionality with our demo patient list.
      </Text>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color="#9eafbd"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search patients"
          placeholderTextColor="#9eafbd"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Patients header + add button */}
      <View style={styles.patientsHeader}>
        <Text style={styles.patientsTitle}>Patients</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Patient</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          //   <View style={styles.patientRow}>
          <TouchableOpacity
            style={styles.patientRow}
            onPress={() => navigation.navigate("Summary", { patient: item })}
          >
            <View style={styles.patientInfo}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.patientName}>{item.name}</Text>
                <Text style={styles.patientDetails}>{item.details}</Text>
              </View>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {item.riskLabel} – {item.riskPct}
              </Text>
              <View
                style={[styles.pillDot, { backgroundColor: item.riskColor }]}
              />
            </View>
            {/* </View> */}
          </TouchableOpacity>
        )}
      />

      {/* Bottom tabs */}
      <View style={styles.tabBar}>
        {[
          { name: "Home", icon: "home", active: true },
          { name: "Predictions", icon: "account-multiple-outline" },
          { name: "Settings", icon: "cog-outline" },
        ].map((tab) => (
          <TouchableOpacity key={tab.name} style={styles.tabItem}>
            <MaterialCommunityIcons
              name={tab.icon}
              size={24}
              color={tab.active ? "#fff" : "#9eafbd"}
            />
            <Text
              style={[
                styles.tabText,
                { color: tab.active ? "#fff" : "#9eafbd" },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  searchWrapper: {
    flexDirection: "row",
    backgroundColor: "#2b3740",
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    paddingHorizontal: 12,
    height: 48,
    marginVertical: 8,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  patientsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  patientsTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  addButton: {
    backgroundColor: "#cedfed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#151a1e",
    fontWeight: "700",
    fontSize: 14,
  },
  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#151a1e",
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 12,
  },
  patientInfo: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#333",
  },
  patientName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  patientDetails: {
    color: "#9eafbd",
    fontSize: 14,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2b3740",
    width: 150,
    height: 25,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  pillText: {
    flex: 1, // fill the remaining space
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 6,
  },
  pillDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  //   onlineDot: {
  //     width: 12,
  //     height: 12,
  //     borderRadius: 6,
  //     backgroundColor: "#0bda5b",
  //     marginRight: 16,
  //   },
  tabBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
});
