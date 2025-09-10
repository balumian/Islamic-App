import React, { useState } from "react";
import TitleBar from "@/app/components/titleBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import NavBar from "@/app/components/navBar";
import SubCatItem from "@/app/components/subCatItem";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function AudioSubCat() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params;
  const [list, setList] = useState([
    { id: 1, title: "Sheikh Abu Ishaq Al-Huwaini", subTitle: "21 Lectures" },
    { id: 2, title: "Shaykh. Yasir Al- Jabri Madani", subTitle: "25 Lectures" },
    {
      id: 3,
      title: "Shaikh. Al-Allamah Ehsan Ilahi Zaheer",
      subTitle: "32 Lectures",
    },
    { id: 4, title: "Shaykh . Abu Zaid Zameer", subTitle: "45 Lectures" },
  ]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title={title} />
        <View style={styles.contentContainer}>
          {list &&
            list.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("Audio", { title: item.title })
                }
              >
                <SubCatItem title={item.title} subTitle={item.subTitle} />
              </TouchableOpacity>
            ))}
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
    overflow: "scroll",
  },
});
