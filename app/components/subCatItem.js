import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import IconFarword from "@/assets/images/ico-farword.svg";

export default function SubCatItem({ title, subTitle }) {
  return (
    <View style={styles.box}>
      <Image
        style={styles.speakerImg}
        source={require("@/assets/images/profile.png")}
      />
      <View style={styles.textBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.ico}>
        <IconFarword />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF33",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: "#925D3C80",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.15);",
  },
  speakerImg: {
    width: 64,
    height: 64,
    flexShrink: 0,
    borderRadius: 5,
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#925D3C",
    fontSize: 14,
    fontWeight: 700,
  },
  subTitle: {
    color: "#925D3C",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
  },
  ico: {
    justifyContent: "center",
  },
});
