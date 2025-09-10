import React from "react";
import { StyleSheet, Dimensions } from "react-native";
// import PDFReader from "react-native-pdf";
import { WebView } from "react-native-webview";
export default function PDFViewer({ route }) {
  const { uri } = route.params;

  return <WebView source={uri} style={styles.pdf} />;
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
