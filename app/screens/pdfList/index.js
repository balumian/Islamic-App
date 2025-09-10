import React from "react";
import TitleBar from "@/app/components/titleBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import NavBar from "@/app/components/navBar";
import PDFItem from "@/app/components/pdfItem";
import { useRoute } from "@react-navigation/native";
export default function PDFList({ navigation }) {
  const route = useRoute();
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title={title} />
        <View style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PDFViewer", {
                uri: require("@/assets/sample.pdf"),
              })
            }
          >
            <PDFItem />
          </TouchableOpacity>
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
});
