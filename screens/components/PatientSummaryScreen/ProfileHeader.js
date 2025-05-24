// components/ProfileHeader.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfileHeader({ avatar, name, id, details }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>ID: {id}</Text>
        <Text style={styles.meta}>{details}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", padding: 16, alignItems: "center" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: "#333" },
  text: { marginLeft: 16 },
  name: { color: "#fff", fontSize: 22, fontWeight: "700" },
  meta: { color: "#9eafbd", fontSize: 14, marginTop: 4 },
});
