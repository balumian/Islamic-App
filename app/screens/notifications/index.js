import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import TitleBar from "@/app/components/titleBar";
import NotifyItem from "@/app/components/notifyItem";
export default function Notifications() {
  const [list, setList] = useState([
    {
      id: 1,
      title: "LIVE Session",
      desc: "QnA by Shiekh.Abu Zaid Zammer",
      time: "23 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Zakat Update",
      desc: "Calculate your total Zakat with our App in less than a minute",
      time: "25 mins ago",
      read: false,
    },
    {
      id: 3,
      title: "Zakat Update",
      desc: "Calculate your total Zakat with our App in less than a minute",
      time: "26 mins ago",
      read: true,
    },
  ]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title="Notifications" />
        <View style={styles.contentContainer}>
          {list &&
            list.map((item) => (
              <NotifyItem
                key={item.id}
                title={item.title}
                desc={item.desc}
                time={item.time}
                read={item.read}
              />
            ))}
        </View>
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
