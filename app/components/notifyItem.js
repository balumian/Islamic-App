import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import IconFarword from "@/assets/images/ico-farword.svg";
const NotifyItem = ({ title, desc, time, read }) => {
  return (
    <View style={[styles.container, read && styles.readNote]}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
      <View style={styles.msgBox}>
        <Text style={styles.descText}>{desc}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
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
  titleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: {
    color: "#925D3C",
    fontSize: 14,
    fontWeight: 700,
  },
  descText: {
    color: "#925D3C",
    fontSize: 12,
    fontWeight: 400,
  },
  msgBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  timeText: {
    color: "#925D3C",
    fontSize: 10,
    fontWeight: 400,
    opacity: 0.5,
  },
  readNote: {
    opacity: 0.6,
    boxShadow: "unset",
  },
});

export default NotifyItem;
