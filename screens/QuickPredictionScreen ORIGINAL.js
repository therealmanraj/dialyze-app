// screens/QuickPredictionScreen.js────────────────────────────────────

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import LabValuesInputs from "./components/LabValuesInputs";

import {
  SageMakerRuntimeClient,
  InvokeEndpointCommand,
} from "@aws-sdk/client-sagemaker-runtime";

import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
  AWS_REGION,
  SAGEMAKER_ENDPOINT,
} from "@env";

const LAB_FIELDS = [
  "HCO3",
  "Creatinine",
  "Mean Arterial Pressure",
  "Procalcitonin",
  "Bilirubin",
  "pH",
  "Albumin",
  "Urea",
  "White Blood Cell Count",
  "SOFA",
  "APACHEII",
  "Glasgow",
];

// Read from .env
const ENDPOINT_NAME = SAGEMAKER_ENDPOINT;
const REGION = AWS_REGION;
const AWS_CREDENTIALS = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  sessionToken: AWS_SESSION_TOKEN || "",
};

export default function QuickPredictionScreen({ navigation }) {
  const [labValues, setLabValues] = useState({});
  const [loading, setLoading] = useState(false);

  const allFilled = LAB_FIELDS.every((key) => {
    const v = labValues[key];
    return typeof v === "string" && v.trim() !== "";
  });

  const client = new SageMakerRuntimeClient({
    region: REGION,
    credentials: AWS_CREDENTIALS,
  });

  async function handlePredict() {
    if (!allFilled) return;

    const payloadObject = {};
    LAB_FIELDS.forEach((key) => {
      const num = parseFloat(labValues[key]);
      payloadObject[key] = isNaN(num) ? null : num;
    });
    const bodyString = JSON.stringify(payloadObject);

    const command = new InvokeEndpointCommand({
      EndpointName: ENDPOINT_NAME,
      ContentType: "application/json",
      Accept: "application/json",
      Body: bodyString,
    });

    setLoading(true);
    try {
      const response = await client.send(command);

      let responseBody = "";
      if (response.Body instanceof Uint8Array) {
        responseBody = new TextDecoder("utf-8").decode(response.Body);
      } else if (response.Body?.text) {
        responseBody = await response.Body.text();
      } else {
        responseBody = response.Body?.toString() ?? "";
      }

      let parsed;
      try {
        parsed = JSON.parse(responseBody);
      } catch (err) {
        throw new Error(
          `Failed to parse JSON from SageMaker endpoint: ${responseBody}`
        );
      }

      navigation.navigate("PredictionOutcome", {
        prediction: parsed,
        labValues,
      });
    } catch (err) {
      console.error("Error invoking SageMaker endpoint:", err);
      Alert.alert(
        "Prediction Error",
        `Could not get model prediction:\n${
          err.message || JSON.stringify(err)
        }`,
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dialyze</Text>
      </View>

      <Text style={styles.pageTitle}>Quick Prediction</Text>
      <Text style={styles.pageSub}>
        Enter lab values to get an immediate prediction of AKI risk.
      </Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <LabValuesInputs labValues={labValues} setLabValues={setLabValues} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.predictButton,
              (!allFilled || loading) && styles.predictButtonDisabled,
            ]}
            onPress={handlePredict}
            disabled={!allFilled || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.predictButtonText}>Predict</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#151a1e" },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#151a1e",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
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
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#151a1e",
  },
  predictButton: {
    backgroundColor: "#0f7fdb",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  predictButtonDisabled: {
    backgroundColor: "#555",
  },
  predictButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
