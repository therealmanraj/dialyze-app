// components/LabTrendsSection.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function LabTrendsSection({
  metric,
  value,
  changePct,
  labels,
  data,
}) {
  const { width } = useWindowDimensions();
  const contentWidth = width - 32;

  const chartData = labels.map((label, i) => ({
    value: data[i] ?? 0,
    label,
  }));

  const pointCount = chartData.length;
  const pointSpacing = contentWidth / (pointCount - 1);

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

      <View style={{ alignSelf: "center" }} pointerEvents="none">
        <LineChart
          data={chartData}
          width={contentWidth}
          height={148}
          initialSpacing={0}
          spacing={pointSpacing}
          curved
          hideDataPoints
          areaChart
          color1="#91B0C9"
          startFillColor1="#91B0C9"
          startOpacity={0.2}
          endOpacity={0}
          noOfSections={3}
          showVerticalLines={false}
          xAxisThickness={0}
          yAxisThickness={0}
          hideYAxisText={true}
          yAxisLabelTexts={[]}
          xAxisLabelTexts={[]}
          xAxisLabelTextStyle={{ color: "transparent" }}
          dashColor="#151a1e"
          hideRules={true}
          scrollable={false}
          isInteractionActive={false}
        />
      </View>
      <View
        style={{
          width: contentWidth,
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
        pointerEvents="none"
      >
        {labels.map((lbl) => (
          <Text key={lbl} style={styles.xLabel}>
            {lbl}
          </Text>
        ))}
      </View>
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
  header: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  metric: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 4,
  },
  change: {
    color: "#9eafbd",
    fontSize: 14,
    marginTop: 2,
  },
  pct: {
    color: "#0bda5b",
    fontWeight: "600",
  },
  xLabel: {
    color: "#9eafbd",
    fontSize: 12,
  },
});
