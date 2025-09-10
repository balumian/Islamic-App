import TitleBar from "@/app/components/titleBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import NavBar from "@/app/components/navBar";
import AudioItem from "@/app/components/audioItem";
import { useRoute } from "@react-navigation/native";
export default function Audios() {
  const route = useRoute();
  const { title } = route.params;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title={title} />
        <View style={styles.contentContainer}>
          <AudioItem playarea={false} />
          <AudioItem playarea={true} />
          <AudioItem playarea={false} />
          <AudioItem playarea={false} />
          <AudioItem playarea={false} />
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
