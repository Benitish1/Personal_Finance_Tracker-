import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";

const StatCard = ({ label, value, accent }) => {
  return (
    <View style={[styles.card, { borderColor: accent || colors.border }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: accent || colors.text }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    flex: 1,
    minHeight: 86,
    justifyContent: "space-between",
  },
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 10 },
  value: { color: colors.text, fontWeight: "800", fontSize: 18 },
});

export default StatCard;
