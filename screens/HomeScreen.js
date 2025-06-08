// screens/HomeScreen.js
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PatientsContext } from "./contexts/PatientsContext";

import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DELETE_WIDTH = 300;
const SWIPE_THRESHOLD = -DELETE_WIDTH / 2;
const TAP_CANCEL_THRESHOLD = 5;

function PatientRow({ item, onPress, onDelete }) {
  const [swiped, setSwiped] = useState(false);
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, ctx) {
      ctx.startX = translateX.value;
      runOnJS(setSwiped)(false);
    },
    onActive(event, ctx) {
      const next = ctx.startX + event.translationX;
      translateX.value = Math.max(Math.min(next, 0), -DELETE_WIDTH);
      if (Math.abs(event.translationX) > TAP_CANCEL_THRESHOLD) {
        runOnJS(setSwiped)(true);
      }
    },
    onEnd(event) {
      const shouldDelete =
        translateX.value < SWIPE_THRESHOLD || event.velocityX < -500;

      if (shouldDelete) {
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () =>
          runOnJS(onDelete)(item.id)
        );
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.rowContainer}>
      <View style={styles.deleteBackground}>
        <MaterialCommunityIcons name="trash-can" size={24} color="#fff" />
      </View>

      <PanGestureHandler
        onGestureEvent={gestureHandler}
        activeOffsetX={[-10, 10]}
        failOffsetY={[-5, 5]}
      >
        <Animated.View style={[styles.rowContent, animatedStyle]}>
          <TouchableOpacity
            style={styles.patientRowInner}
            onPress={() => {
              if (!swiped) onPress();
            }}
            disabled={swiped}
            activeOpacity={swiped ? 1 : 0.7}
          >
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
      </PanGestureHandler>
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
    <SafeAreaView
      style={styles.root}
      edges={["top", "left", "right", "bottom"]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PatientRow
                item={item}
                onPress={() =>
                  navigation.navigate("Summary", { patientId: item.id })
                }
                onDelete={removePatient}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </TouchableWithoutFeedback>
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

  rowContainer: {
    marginVertical: 4,
    overflow: "hidden",
  },
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  rowContent: {
    backgroundColor: "#151a1e",
  },

  patientRowInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
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
});
