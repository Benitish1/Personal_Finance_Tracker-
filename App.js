/**
 * Architecture & Data Flow (NE Practical):
 * - Presentation layer: screens/components under src/screens and src/components.
 * - Navigation layer: auth stack + app stack + bottom tabs under src/navigation.
 * - Data layer: axios instance + API services under src/services using MockAPI endpoints.
 * - State management: React Context providers (AuthContext, ExpenseContext).
 *
 * Data flow:
 * UI event -> Context action -> Service call (axios) -> API response/error
 * -> Context state update -> Screen re-render with user feedback.
 */
import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import { ExpenseProvider } from "./src/context/ExpenseContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ExpenseProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </ExpenseProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
