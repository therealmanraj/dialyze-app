// components/BottomTabBar.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BottomTabBar({ activeTab, navigation }) {
  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Predictions", icon: "account-multiple-outline" },
    { name: "Settings", icon: "cog-outline" },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = tab.name === activeTab;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() =>
              navigation.navigate(
                tab.name === "Home"
                  ? "Home"
                  : tab.name === "Predictions"
                  ? "QuickPrediction"
                  : "Settings"
              )
            }
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={24}
              color={isActive ? "#fff" : "#9eafbd"}
            />
            <Text
              style={[styles.tabText, { color: isActive ? "#fff" : "#9eafbd" }]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#1f272e",
    borderTopColor: "#2b3740",
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
});
