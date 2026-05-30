import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import colors from "../theme/colors";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const budgets = user?.budgets || [];

  const onLogout = () => {
    Alert.alert("Logout", "Do you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile & Settings</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.username || "Unknown"}</Text>
        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>{user?.id || "-"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.budgetTitle}>Budgets</Text>
        {budgets.length ? (
          budgets.map((b, index) => (
            <View key={`${b.category}-${index}`} style={styles.budgetRow}>
              <Text style={styles.budgetText}>{b.category}</Text>
              <Text style={styles.budgetAmount}>
                {b.period || "Monthly"} - ${Number(b.amount || 0).toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>No budgets found for this user account.</Text>
        )}
      </View>

      <Pressable style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 26 },
  title: { color: colors.text, fontSize: 26, fontWeight: "800", marginBottom: 14 },
  card: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 14, marginBottom: 12 },
  label: { color: colors.textMuted, marginTop: 8, marginBottom: 4 },
  value: { color: colors.text, fontSize: 16, fontWeight: "700" },
  budgetTitle: { color: colors.text, fontWeight: "700", fontSize: 17, marginBottom: 8 },
  budgetRow: { marginBottom: 8, borderBottomWidth: 1, borderBottomColor: "#384B62", paddingBottom: 8 },
  budgetText: { color: colors.text, fontWeight: "700" },
  budgetAmount: { color: colors.secondary, marginTop: 3 },
  empty: { color: colors.textMuted },
  logoutBtn: { backgroundColor: "#3A1522", borderWidth: 1, borderColor: colors.danger, borderRadius: 12, padding: 13, alignItems: "center" },
  logoutText: { color: colors.danger, fontWeight: "800" },
});

export default ProfileScreen;
