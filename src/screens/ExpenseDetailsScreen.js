import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { getExpenseById } from "../services/expenseService";
import colors from "../theme/colors";

const ExpenseDetailsScreen = ({ route }) => {
  const { expenseId } = route.params;
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getExpenseById(expenseId);
        setExpense(data);
      } catch {
        Alert.alert("Error", "Unable to fetch expense details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [expenseId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  if (!expense) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{expense.title || expense.name || "Expense"}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{expense.id}</Text>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>${Number(expense.amount || 0).toFixed(2)}</Text>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{expense.category || "Uncategorized"}</Text>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{expense.date || expense.createdAt?.slice(0, 10) || "N/A"}</Text>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{expense.description || "No description."}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg },
  empty: { color: colors.textMuted },
  title: { color: colors.text, fontSize: 25, fontWeight: "800", marginBottom: 14 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.textMuted, marginTop: 10, marginBottom: 4 },
  value: { color: colors.text, fontSize: 16, fontWeight: "700" },
});

export default ExpenseDetailsScreen;
