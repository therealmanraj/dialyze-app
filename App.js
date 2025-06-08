// App.js
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { PatientsProvider } from "./screens/contexts/PatientsContext";

import HomeScreen from "./screens/HomeScreen";
import AddNewPatientScreen from "./screens/AddNewPatientScreen";
import QuickPredictionScreen from "./screens/QuickPredictionScreen";
import SettingsScreen from "./screens/SettingsScreen";

import PatientSummaryScreen from "./screens/PatientSummaryScreen/PatientSummaryScreen";
import UpdateClinicalInfoScreen from "./screens/PatientSummaryScreen/UpdateClinicalInfoScreen";
import UpdatePredictionScreen from "./screens/PatientSummaryScreen/UpdatePredictionScreen";

import PredictionOutcomeScreen from "./screens/QuickPredictionScreen/PredictionOutcomeScreen";
import AddPatientScreen from "./screens/QuickPredictionScreen/AddPatientScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#151a1e", // match your app’s dark background
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#9eafbd",
        tabBarStyle: { backgroundColor: "#1f272e", borderTopColor: "#2b3740" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Predictions")
            iconName = "account-multiple-outline";
          else if (route.name === "Settings") iconName = "cog-outline";
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarLabelStyle: { fontSize: 12, marginBottom: 2 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Predictions" component={QuickPredictionScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#151a1e" }}>
        <PatientsProvider>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: "none",
                contentStyle: { backgroundColor: "#151a1e" },
              }}
            >
              <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{
                  animation: "slide_from_bottom",
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="Summary"
                component={PatientSummaryScreen}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="AddNewPatient"
                component={AddNewPatientScreen}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="UpdateClinicalInfo"
                component={UpdateClinicalInfoScreen}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="UpdatePrediction"
                component={UpdatePredictionScreen}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="PredictionOutcome"
                component={PredictionOutcomeScreen}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="AddPatient"
                component={AddPatientScreen}
                options={{ animation: "slide_from_right" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PatientsProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
