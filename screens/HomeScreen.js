// screens/HomeScreen.js
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable, RectButton } from "react-native-gesture-handler";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const INITIAL_PATIENTS = [
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
  {
    id: "3",
    name: "John Smith",
    details: "Age: 72, Male",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxlcPx1dh-l8uhb9AvXQovks5QvuaDw8nQlNHdEw_ih_jmt_2yAteEVaYa_QoEYS2XdZP9qbacppKkhvpbjflNr5hFfJUesihfdQQYkAYqCiNI5UvX_0bVNf1xIMQhz2xoLLJH7iD98IGVJhWnK4KGLaZ7zqs2wEWexXOJNMXOiy4fb6iidqojcOZhk_0jKQHefiuQZ474WDRqZA_xlK48aEtbPm4-lIkL9ObBX_ip1h4feAHQb58WPaw4NLs-B7A4cwKjVCcvnE",
    riskLabel: "Low",
    riskPct: "10%",
    riskColor: "#0AD95C",
  },
  {
    id: "4",
    name: "Olivia Brown",
    details: "Age: 20, Female",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OboGcvAk2beHqEABPJ8Z-O-qesZemOu11NYQidOkhTrQ-pU_fCa1ZMirdpiQKTD9FceLQOQn0E2i0sS2SuqTColDfZz_oCczDvgLgleKYn9vijRA64GaNSqw9fv0Eg-2zeg-OMsi1oj6_jZ94Zms60Fon893UgswtZCEkqv7oobFaQRkTcty47mBJcPvzm-WCHCyvUxuT5MYFviOdfG2nqOZe-CjU9KxCgDtnIbnFnvgvoInzIWCxZEglukRqJu-KsDwwe4WIiA",
    riskLabel: "Low",
    riskPct: "25%",
    riskColor: "#0AD95C",
  },
];

function PatientRow({ item, onPress, onDelete }) {
  const opacity = useRef(new Animated.Value(1)).current;

  const handleDelete = () => {
    // 1) Fade out
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // 2) Then animate layout and actually remove
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onDelete(item.id);
    });
  };

  const rightAction = () => (
    <RectButton style={styles.deleteButton} onPress={handleDelete}>
      <MaterialCommunityIcons name="trash-can" size={24} color="#fff" />
      <Text style={styles.deleteText}>Delete</Text>
    </RectButton>
  );

  return (
    <Swipeable renderRightActions={rightAction}>
      <Animated.View style={{ opacity }}>
        <TouchableOpacity style={styles.patientRow} onPress={onPress}>
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
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  );
}

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) =>
    setPatients((prev) => prev.filter((p) => p.id !== id));

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialyze</Text>
      </View>
      <Text style={styles.pageTitle}>Welcome to Dialyze</Text>
      <Text style={styles.pageSub}>
        Explore the app’s functionality with our demo patient list.
      </Text>

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

      <View style={styles.patientsHeader}>
        <Text style={styles.patientsTitle}>Patients</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddNewPatient")}
        >
          <Text style={styles.addButtonText}>Add Patient</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <PatientRow
            item={item}
            onPress={() => navigation.navigate("Summary", { patient: item })}
            onDelete={handleDelete}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#151a1e" },

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
  searchInput: { flex: 1, color: "#fff", fontSize: 16 },

  patientsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  patientsTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  addButton: {
    backgroundColor: "#cedfed",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: { color: "#151a1e", fontWeight: "700", fontSize: 14 },

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
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#333" },
  patientName: { color: "#fff", fontSize: 16, fontWeight: "500" },
  patientDetails: { color: "#9eafbd", fontSize: 14 },

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
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 6,
  },
  pillDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },

  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 4,
    borderRadius: 12,
  },
  deleteText: { color: "#fff", fontSize: 12, marginTop: 4 },
});
