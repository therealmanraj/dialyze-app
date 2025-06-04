import React, { useState, useRef, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { PatientsContext } from "./contexts/PatientsContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function PatientRow({ item, onPress, onDelete }) {
  const opacity = useRef(new Animated.Value(1)).current;

  const handleDelete = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      onDelete(item.id);
    });
  };

  return (
    <View style={styles.rowContainer}>
      <Swipeable
        renderRightActions={() => (
          <RectButton style={styles.deleteButton} onPress={handleDelete}>
            <MaterialCommunityIcons name="trash-can" size={24} color="#fff" />
            <Text style={styles.deleteText}>Delete</Text>
          </RectButton>
        )}
      >
        <Animated.View style={{ opacity }}>
          <TouchableOpacity style={styles.patientRowInner} onPress={onPress}>
            <View style={styles.patientInfo}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.patientName}>{item.name}</Text>
                <Text style={styles.patientDetails}>
                  Age: {item.clinical.age || "N/A"},{" "}
                  {item.clinical.gender || "N/A"}
                </Text>
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
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const { patients, removePatient } = useContext(PatientsContext);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dialyze</Text>
        </View>
        <Text style={styles.pageTitle}>Welcome to Dialyze</Text>
        <Text style={styles.pageSub}>
          Explore the app's functionality with our demo patient list.
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PatientRow
              item={item}
              onPress={() =>
                navigation.navigate("Summary", { patientId: item.id })
              }
              onDelete={() => removePatient(item.id)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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

  rowContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },

  patientRowInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#151a1e",
    paddingVertical: 12,
    paddingHorizontal: 0,
    flex: 1,
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
  },
  pillDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },

  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 4,
  },
  deleteText: { color: "#fff", fontSize: 12, marginTop: 4 },
});
