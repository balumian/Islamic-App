import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import IconOpen from "@/assets/images/ico-open.svg";
import IconClose from "@/assets/images/ico-close.svg";
const CalField = ({ title, value, onChangeText, isOpen, onToggle }) => {
  const handleChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, ""); // ✅ only digits
    onChangeText(numericText);
  };
  return (
    <View style={styles.fieldContainer}>
      <TouchableOpacity onPress={onToggle}>
        <View style={[styles.titleBar, isOpen && styles.openStyle]}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.iconBox}>
            {isOpen ? <IconClose /> : <IconOpen />}
          </View>
        </View>
        {isOpen && (
          <View style={styles.body}>
            <Text style={styles.prefix}>$</Text>
            <TextInput
              style={styles.textInput}
              placeholder=""
              value={value}
              keyboardType="numeric"
              onChangeText={handleChange}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: "column",
    borderRadius: 10,
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.15);",
  },
  titleBar: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#925D3C",
    flexDirection: "row",
    borderRadius: 10,
  },
  titleBox: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 400,
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9DFD8",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#EDE5E0",
  },
  prefix: {
    marginRight: 6,
    fontSize: 14,
    fontWeight: 800,
    textTransform: "uppercase",
    color: "#643F29",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: 800,
    color: "#643F29",
    padding: 0,
  },
  openStyle: {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
});

export default CalField;
