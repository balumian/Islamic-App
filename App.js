import React from "react";
import "./i18n";
import Navigation from "@/app/navigation";
import { PrayersProvider } from "@/app/context/PrayersContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  return (
    <SafeAreaProvider>
      <PrayersProvider>
        <Navigation />
      </PrayersProvider>
    </SafeAreaProvider>
  );
}
