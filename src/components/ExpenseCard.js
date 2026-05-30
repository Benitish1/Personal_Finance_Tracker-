import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";

const ExpenseCard = ({ item, onPress, onDelete }) => {
  const amount = Number(item.amount || 0).toFixed(2);
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}>{item.title || item.name || "Untitled Expense"}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description || "No description"}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>${amount}</Text>
        <Pressable style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  title: { color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 6 },
  description: { color: colors.textMuted, maxWidth: 180 },
  right: { alignItems: "flex-end", justifyContent: "space-between" },
  amount: { color: colors.secondary, fontWeight: "800", fontSize: 16 },
  deleteBtn: {
    backgroundColor: "#3A1522",
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  deleteText: { color: colors.danger, fontWeight: "700" },
});

export default ExpenseCard;
