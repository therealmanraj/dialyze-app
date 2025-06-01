// components/LabTrendsSection.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function LabTrendsSection({
  metric,
  value,
  changePct,
  labels, // e.g. ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
  data, // e.g. [80, 95, 60, 75, 100, 85, 90]
}) {
  // 1) Grab the full screen width
  const { width } = useWindowDimensions();
  const contentWidth = width - 32;

  // 2) Zip labels + data into GiftedCharts format:
  const chartData = labels.map((label, i) => ({
    value: data[i] ?? 0,
    label,
  }));

  // 3) Compute spacing so the final point lands exactly at x = contentWidth
  const pointCount = chartData.length;
  const pointSpacing = contentWidth / (pointCount - 1);

  return (
    <View style={{ marginTop: 24 }}>
      {/* Section Title */}
      <Text style={styles.title}>Recent Lab Trends</Text>

      {/* Metric / Value / Change */}
      <View style={styles.header}>
        <Text style={styles.metric}>{metric}</Text>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.change}>
          Last 7 Days <Text style={styles.pct}>{changePct}</Text>
        </Text>
      </View>

      {/*
        ─────────────────────────────────────────────────────────────────────────
        Wrapping the chart in a View with pointerEvents="none" ensures that any
        touch/click on the chart will be ignored completely—no panning, no tooltips.
      */}
      <View style={{ alignSelf: "center" }} pointerEvents="none">
        <LineChart
          data={chartData}
          // Use contentWidth so the chart is centered with 16px padding on each side:
          width={contentWidth}
          height={200}
          initialSpacing={0}
          spacing={pointSpacing}
          curved // bezier curve
          hideDataPoints // no dot at each x-coordinate
          areaChart // fill under the curve
          areaChartGradient={{
            from: "#2b3740", // fill color at top
            to: "#2b3740", // fill color at bottom
          }}
          lineColor="rgba(206,223,237,1)"
          // ─── REMOVE ALL GRID LINES & AXES ───────────────────────
          noOfSections={3} // we’re “reserving” 3 sections, but will hide them
          showVerticalLines={false}
          xAxisThickness={0}
          yAxisThickness={0}
          hideYAxisText={true}
          yAxisLabelTexts={[]}
          xAxisLabelTexts={[]} // draw our own X‐axis labels below
          xAxisLabelTextStyle={{ color: "transparent" }}
          dashColor="#151a1e" // make the dashed “section” lines the same as background
          hideRules={true} // explicitly hide all horizontal lines
          scrollable={false} // no built‐in panning at all
          isInteractionActive={false}
        />
      </View>

      {/* ─── MANUAL X‐AXIS LABELS ─────────────────────────────────
          We passed xAxisLabelTexts={[]} above, so GiftedCharts left
          the bottom free of labels. Now we render a row of 7 Text
          nodes, equally spaced, to exactly match each data point.
      */}
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
    paddingHorizontal: 16, // pushes title in from the very left
  },
  header: {
    marginHorizontal: 16, // push the metric/value/change slightly right
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
