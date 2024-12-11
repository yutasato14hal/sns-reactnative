import { useState } from "react";
import { Image, StyleSheet, RefreshControl } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TimeLineCell } from "@/components/TimeLineCell";

import { useTimelineData } from "@/hooks/useFirestoreData";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [liked, setLiked] = useState(false);
  const { timeline, fetchMore, refresh } = useTimelineData();

  console.log("=========================");
  console.log(timeline);
  console.log("=========================");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#202020", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              setRefreshing(false);
            }, 2000);
          }}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{marginTop:-30}}>タイムライン</ThemedText>
      </ThemedView>

      {timeline.map((data, index) => {
        return <TimeLineCell key={index} data={data} />;
      })}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
