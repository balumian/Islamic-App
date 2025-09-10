import { StyleSheet, Text } from "react-native";

export function ThemedText({ style, type = "default", ...rest }) {
  return (
    <Text
      style={[
        style,
        type === "default" && styles.default,
        type === "light" && styles.light,
        type === "bold" && styles.bold,
        type === "bolder" && styles.bolder,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "AlmaraiRegular",
  },
  light: {
    fontFamily: "AlmaraiLight",
  },
  bold: {
    fontFamily: "AlmaraiBold",
  },
  bolder: {
    fontFamily: "AlmaraiExtraBold",
  },
});
