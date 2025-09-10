import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import IconFarword from "@/assets/images/ico-farword.svg";
const CatItem = ({ Icon, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Icon />
      </View>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.iconBox}>
        <IconFarword />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF33",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: "#925D3C80",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.15);",
  },
  iconBox: { justifyContent: "center" },
  titleBox: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 16,
  },
  title: {
    color: "#925D3C",
    fontSize: 12,
    fontWeight: 400,
    textTransform: "uppercase",
    opacity: 0.8,
  },
  touchBtn: {
    flex: 1,
    flexDirection: "row",
  },
});

export default CatItem;
