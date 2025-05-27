// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import QuickPredictionScreen from "./screens/QuickPredictionScreen";
import SettingsScreen from "./screens/SettingsScreen";

import PatientSummaryScreen from "./screens/PatientSummaryScreen";
import UpdateClinicalInfoScreen from "./screens/PatientSummaryScreen/UpdateClinicalInfoScreen";
import PredictionReviewScreen from "./screens/PatientSummaryScreen/PredictionReviewScreen";
import UpdatePredictionScreen from "./screens/PatientSummaryScreen/UpdatePredictionScreen";

import PredictionOutcomeScreen from "./screens/QuickPredictionScreen/PredictionOutcomeScreen";
import AddPatientScreen from "./screens/QuickPredictionScreen/AddPatientScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1) Main tab navigator
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

// 2) Root stack that wraps the tabs plus all deeper screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        {/* your 3 top-level tabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            animation: "slide_from_bottom",
            // other options
            // options={{
            //   animation: 'slide_from_right',   // slide in from the right
            //   animation: 'slide_from_left',    // slide in from the left
            //   animation: 'slide_from_bottom',  // slide up from the bottom
            //   animation: 'fade',               // cross-fade
            //   animation: 'fade_from_bottom',   // fade + slight upward motion
            //   animation: 'flip',               // card flip
            //   animation: 'default',            // platform default
            //   animation: 'none',               // no animation
            // }}
            gestureEnabled: true,
          }}
        />

        {/* patient-detail flows */}
        <Stack.Screen
          name="Summary"
          component={PatientSummaryScreen}
          options={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="UpdateClinicalInfo"
          component={UpdateClinicalInfoScreen}
          options={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="PredictionReview"
          component={PredictionReviewScreen}
          options={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="UpdatePrediction"
          component={UpdatePredictionScreen}
          options={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />

        {/* quick-prediction flows */}
        <Stack.Screen
          name="PredictionOutcome"
          component={PredictionOutcomeScreen}
          options={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddPatientScreen}
          options={{
            animation: "slide_from_right",
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
