import React, { useCallback } from "react";
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useExpenses } from "../context/ExpenseContext";
import ExpenseCard from "../components/ExpenseCard";
import colors from "../theme/colors";

const ExpensesListScreen = () => {
  const navigation = useNavigation();
  const { expenses, fetchExpenses, deleteExpense, loadingExpenses } = useExpenses();

  useFocusEffect(
    useCallback(() => {
      fetchExpenses().catch(() => Alert.alert("Sync Failed", "Could not load expenses from API."));
    }, [])
  );

  const onDelete = (id) => {
    Alert.alert("Delete Expense", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteExpense(id);
          } catch {
            Alert.alert("Delete Failed", "Could not delete expense. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loadingExpenses} onRefresh={fetchExpenses} tintColor={colors.secondary} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <ExpenseCard
            item={item}
            onDelete={() => onDelete(item.id)}
            onPress={() => navigation.navigate("ExpenseDetails", { expenseId: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No expenses found yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: colors.text, fontSize: 25, fontWeight: "800", marginBottom: 14 },
  empty: { color: colors.textMuted, textAlign: "center", marginTop: 40 },
});

export default ExpensesListScreen;
