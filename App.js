// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";

import PatientSummaryScreen from "./screens/PatientSummaryScreen";
import UpdateClinicalInfoScreen from "./screens/PatientSummaryScreen/UpdateClinicalInfoScreen";
import PredictionReviewScreen from "./screens/PatientSummaryScreen/PredictionReviewScreen";

import QuickPredictionScreen from "./screens/QuickPredictionScreen";
import PredictionOutcomeScreen from "./screens/QuickPredictionScreen/PredictionOutcomeScreen";

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
          options={{ gestureEnabled: false }}
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
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="PredictionOutcome"
          component={PredictionOutcomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
