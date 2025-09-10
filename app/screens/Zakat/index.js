import React, { useState, useMemo } from "react";

import TitleBar from "@/app/components/titleBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import NavBar from "@/app/components/navBar";
import CalField from "@/app/components/calField";
export default function Zakat() {
  const [sections, setSections] = useState([
    { id: 1, title: "Gold or Silver value.", value: "", isOpen: false },
    {
      id: 2,
      title: "Cash on hand or in Bank accounts",
      value: "",
      isOpen: false,
    },
    { id: 3, title: "Tax Returns", value: "", isOpen: false },
    { id: 4, title: "Refundable deposits", value: "", isOpen: false },
    { id: 5, title: "Non delinquent Loans", value: "", isOpen: false },
    {
      id: 6,
      title: "Number of Shares, Bonds or Stocks",
      value: "",
      isOpen: false,
    },
  ]);

  const toggleSection = (id) => {
    setSections((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const updateValue = (id, newValue) => {
    setSections((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value: newValue } : item))
    );
  };

  const totalSum = useMemo(() => {
    return sections.reduce((sum, item) => {
      const num = parseFloat(item.value);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  }, [sections]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title={"Zakat Calculator"} />
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.collapseContainer}>
              {sections.map((item) => (
                <CalField
                  key={item.id}
                  title={item.title}
                  value={item.value}
                  isOpen={item.isOpen}
                  onToggle={() => toggleSection(item.id)}
                  onChangeText={(text) => updateValue(item.id, text)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.valueContainer}>
          <View>
            <Text style={styles.subValue}>Total Value</Text>
            <Text style={styles.valueTitle}>Zakat Due</Text>
          </View>
          <View>
            <Text style={styles.subValue}>$39400.0</Text>
            <Text style={styles.valueTitle}>$985.0</Text>
          </View>
        </View>
        <NavBar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9DFD8",
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
  },
  collapseContainer: {
    flex: 1,
    gap: 20,
  },
  valueContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingHorizontal: 54,
    borderColor: "#925D3C",
    borderStyle: "solid",
    borderTopWidth: 3,
    justifyContent: "space-between",
  },
  subValue: {
    color: "#925D3C",
    fontSize: 16,
    fontWeight: 400,
  },
  valueTitle: {
    color: "#925D3C",
    fontSize: 20,
    fontWeight: 700,
    marginTop: 8,
  },
});
