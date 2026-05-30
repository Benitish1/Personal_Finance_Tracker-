import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import colors from "../theme/colors";

const CreateExpenseScreen = () => {
  const { user } = useAuth();
  const { createExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  const onSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Expense title is required.");
      return;
    }
    if (!amount.trim() || Number(amount) <= 0) {
      Alert.alert("Validation", "Amount must be a positive number.");
      return;
    }
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      Alert.alert("Validation", "Date must be in format YYYY-MM-DD.");
      return;
    }

    const payload = {
      title: title.trim(),
      name: title.trim(),
      amount: Number(amount),
      category: category.trim() || "General",
      description: description.trim() || "",
      date: date.trim() || new Date().toISOString().slice(0, 10),
      userId: user?.id || "0",
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      await createExpense(payload);
      Alert.alert("Success", "Expense created successfully.");
      reset();
    } catch {
      Alert.alert("Error", "Could not create expense. Check connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create Expense</Text>
      <Text style={styles.subtitle}>Task 2: POST /expenses</Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Groceries" placeholderTextColor={colors.textMuted} />
        <Text style={styles.label}>Amount *</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="2500"
          placeholderTextColor={colors.textMuted}
        />
        <Text style={styles.label}>Category</Text>
        <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Food" placeholderTextColor={colors.textMuted} />
        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="2026-05-28" placeholderTextColor={colors.textMuted} />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          placeholder="Add note about this expense..."
          placeholderTextColor={colors.textMuted}
        />
        <Pressable style={styles.button} onPress={onSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Saving..." : "Save Expense"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 28 },
  title: { color: colors.text, fontSize: 26, fontWeight: "800" },
  subtitle: { color: colors.textMuted, marginTop: 6, marginBottom: 14 },
  formCard: { backgroundColor: colors.card, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.text, fontWeight: "700", marginBottom: 6, marginTop: 8 },
  input: {
    backgroundColor: "#0D152A",
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: { textAlignVertical: "top", minHeight: 90 },
  button: { marginTop: 16, backgroundColor: colors.primary, borderRadius: 12, alignItems: "center", padding: 13 },
  buttonText: { color: colors.white, fontWeight: "800" },
});

export default CreateExpenseScreen;
