import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IconBack from "@/assets/images/arrow_back.svg";
import { useNavigation } from "@react-navigation/native";
export default function TitleBar({ title }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconBack />
        </TouchableOpacity>
      </View>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#925D3C",
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  iconBox: {
    justifyContent: "center",
  },
  titleBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
  },
});
