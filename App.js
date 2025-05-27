// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";

import PatientSummaryScreen from "./screens/PatientSummaryScreen";
import UpdateClinicalInfoScreen from "./screens/PatientSummaryScreen/UpdateClinicalInfoScreen";
import PredictionReviewScreen from "./screens/PatientSummaryScreen/PredictionReviewScreen";
import UpdatePredictionScreen from "./screens/PatientSummaryScreen/UpdatePredictionScreen";

import QuickPredictionScreen from "./screens/QuickPredictionScreen";
import PredictionOutcomeScreen from "./screens/QuickPredictionScreen/PredictionOutcomeScreen";
import AddPatientScreen from "./screens/QuickPredictionScreen/AddPatientScreen";

import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "none",
          }}
        />
        <Stack.Screen name="Summary" component={PatientSummaryScreen} />
        <Stack.Screen
          name="UpdateClinicalInfo"
          component={UpdateClinicalInfoScreen}
        />
        <Stack.Screen
          name="PredictionReview"
          component={PredictionReviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuickPrediction"
          component={QuickPredictionScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="PredictionOutcome"
          component={PredictionOutcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UpdatePrediction"
          component={UpdatePredictionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddPatientScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "none",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
