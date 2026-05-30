import React, { useEffect, useMemo } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import StatCard from "../components/StatCard";
import colors from "../theme/colors";

const DashboardScreen = () => {
  const { user } = useAuth();
  const { expenses, fetchExpenses } = useExpenses();

  useEffect(() => {
    fetchExpenses().catch(() => null);
  }, []);

  const totalSpent = useMemo(() => expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0), [expenses]);
  const budgetTotal = useMemo(() => (user?.budgets || []).reduce((sum, b) => sum + Number(b.amount || 0), 0), [user]);
  const remaining = Math.max(budgetTotal - totalSpent, 0);

  const notifications = useMemo(() => {
    if (!budgetTotal) return ["No budget configured yet. Add one in profile."];
    if (totalSpent > budgetTotal) return ["You passed your budget. Review expenses now."];
    if (totalSpent > budgetTotal * 0.8) return ["Warning: You used more than 80% of your budget."];
    return ["You are within your budget. Great control."];
  }, [budgetTotal, totalSpent]);

  const recentPoints = expenses
    .slice(0, 6)
    .reverse()
    .map((e) => Number(e.amount || 0));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Finance Pulse</Text>
      <Text style={styles.subtitle}>Welcome back, {user?.username || "User"}.</Text>

      <View style={styles.row}>
        <StatCard label="Total Spent" value={`$${totalSpent.toFixed(2)}`} accent={colors.secondary} />
        <StatCard label="Budget Total" value={`$${budgetTotal.toFixed(2)}`} accent={colors.primary} />
      </View>

      <View style={styles.row}>
        <StatCard label="Remaining" value={`$${remaining.toFixed(2)}`} accent={colors.success} />
        <StatCard label="Expenses Count" value={`${expenses.length}`} accent={colors.warning} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spending Trend</Text>
        {recentPoints.length > 1 ? (
          <LineChart
            data={{
              labels: recentPoints.map((_, i) => `${i + 1}`),
              datasets: [{ data: recentPoints }],
            }}
            width={Dimensions.get("window").width - 38}
            height={200}
            yAxisLabel="$"
            chartConfig={{
              backgroundGradientFrom: "#1E293B",
              backgroundGradientTo: "#0F172A",
              decimalPlaces: 0,
              color: () => colors.secondary,
              labelColor: () => colors.textMuted,
              propsForDots: { r: "4", strokeWidth: "2", stroke: colors.primary },
            }}
            bezier
            style={{ borderRadius: 12 }}
          />
        ) : (
          <Text style={styles.empty}>Add more expenses to view trend chart.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {notifications.map((note) => (
          <Text key={note} style={styles.notification}>
            • {note}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 18, paddingBottom: 28 },
  title: { fontSize: 28, color: colors.text, fontWeight: "800" },
  subtitle: { color: colors.textMuted, marginTop: 6, marginBottom: 16 },
  row: { flexDirection: "row", gap: 12, marginBottom: 12 },
  section: { backgroundColor: colors.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.border, marginTop: 6 },
  sectionTitle: { color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 12 },
  empty: { color: colors.textMuted },
  notification: { color: colors.text, marginBottom: 7 },
});

export default DashboardScreen;
