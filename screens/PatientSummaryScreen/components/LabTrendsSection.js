// components/LabTrendsSection.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function LabTrendsSection({
  metric,
  value,
  changePct,
  labels,
  data,
}) {
  const width = useWindowDimensions().width;

  return (
    <View style={{ marginTop: 24 }}>
      <Text style={styles.title}>Recent Lab Trends</Text>
      <View style={styles.header}>
        <Text style={styles.metric}>{metric}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.change}>
          Last 7 Days <Text style={styles.pct}>{changePct}</Text>
        </Text>
      </View>
      <LineChart
        data={{ labels, datasets: [{ data }] }}
        width={width}
        height={200}
        withHorizontalLines={false}
        withVerticalLines={false}
        withVerticalLabels
        withHorizontalLabels={false}
        withDots={false}
        withShadow
        chartConfig={{
          backgroundGradientFrom: "#151a1e",
          backgroundGradientTo: "#151a1e",
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          color: (o) => `rgba(206,223,237,${o})`,
          strokeWidth: 2,
          fillShadowGradient: "#2b3740",
          fillShadowGradientOpacity: 1,
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
  },
  header: { marginHorizontal: 16, marginTop: 8 },
  metric: { color: "#fff", fontSize: 16, fontWeight: "500" },
  value: { color: "#fff", fontSize: 32, fontWeight: "700", marginTop: 4 },
  change: { color: "#9eafbd", fontSize: 14, marginTop: 2 },
  pct: { color: "#0bda5b", fontWeight: "600" },
});
