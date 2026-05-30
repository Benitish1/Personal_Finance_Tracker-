import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import colors from "../theme/colors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Missing Password", "Password is required.");
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password.trim());
    } catch (error) {
      const message = error?.message || "Failed to login. Please try again.";
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#0F172A", "#1D2D57", "#3B1F78"]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.inner}>
        <Text style={styles.title}>Personal Finance Tracker</Text>
        <Text style={styles.subtitle}>Track better. Spend smarter. Live calmer.</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.button} disabled={loading} onPress={onLogin}>
            <Text style={styles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
          </Pressable>
          <Text style={styles.helper}>Uses MockAPI: GET /users?username=email</Text>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: "center", padding: 22 },
  title: { color: colors.white, fontSize: 30, fontWeight: "800" },
  subtitle: { color: "#C7D2FE", marginTop: 8, marginBottom: 28, fontSize: 14 },
  formCard: { backgroundColor: "rgba(15,23,42,0.8)", borderRadius: 18, padding: 16, borderWidth: 1, borderColor: "#3F4D6A" },
  label: { color: colors.text, fontWeight: "700", marginTop: 8, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    color: colors.text,
    backgroundColor: "#0D152A",
    marginBottom: 8,
  },
  button: { marginTop: 14, backgroundColor: colors.secondary, borderRadius: 12, padding: 13, alignItems: "center" },
  buttonText: { color: "#052A34", fontWeight: "800" },
  helper: { color: colors.textMuted, marginTop: 10, fontSize: 12, textAlign: "center" },
});

export default LoginScreen;
