import React, { useState } from "react";
import TitleBar from "@/app/components/titleBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CatItem from "@/app/components/catItem";
import NavBar from "@/app/components/navBar";
import IconQuran from "@/assets/images/ico-quran.svg";
import IconLectures from "@/assets/images/ico-lectures.svg";
import IconBook from "@/assets/images/ico-book.svg";
import IconDua from "@/assets/images/ico-dua.svg";
import IconPrayer from "@/assets/images/ico-prayer";
export default function AudioCatalogs({ navigation }) {
  const [list, setList] = useState([
    { id: 1, title: "Quran Recitation", icon: IconQuran },
    { id: 2, title: "Lectures", icon: IconLectures },
    { id: 3, title: "Hadith & Sunnah", icon: IconBook },
    { id: 4, title: "Duas", icon: IconDua },
    { id: 5, title: "Prayers", icon: IconPrayer },
  ]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title="Audio Files" />
        <View style={styles.contentContainer}>
          {list &&
            list.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("AudioSubCat", { title: item.title })
                }
              >
                <CatItem Icon={item.icon} title={item.title} />
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
  },
});
