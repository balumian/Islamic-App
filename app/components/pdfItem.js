import * as React from "react";
import { View, StyleSheet, Text, Button, Slider } from "react-native";
import IconPDF from "@/assets/images/ico-pdf.svg";

const PDFItem = () => {
  return (
    <View style={styles.audioContainer}>
      <View style={styles.titleBar}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Lectures</Text>
        </View>
        <View style={styles.iconBox}>
          <IconPDF />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF33",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: "#925D3C80",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.15);",
  },
  titleBar: {
    flexDirection: "row",
  },
  titleBox: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#643F29",
    fontSize: 12,
    fontWeight: 700,
  },
});

export default PDFItem;
