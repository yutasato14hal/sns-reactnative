import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Pressable,
  Switch,
  RefreshControl,
} from "react-native";
import { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
  const [privacyEnabled, setPrivacyEnabled] = useState(false);

  const menuItems = [
    { id: "1", title: "ユーザーID", type: "input" },
    { id: "2", title: "ユーザー名", type: "input" },
    { id: "3", title: "メールアドレス", type: "input" },
    { id: "4", title: "プライバシー", type: "switch" },
    { id: "5", title: "ログアウト", type: "action" },
  ];

  const renderMenuItem = (item: any) => (
    <View key={item.id} style={styles.listItemContainer}>
      <Text
        style={[
          styles.listItemText,
          item.type === "action" && styles.actionText,
        ]}
      >
        {item.title}
      </Text>
      <View>
        {item.type === "switch" && (
          <Switch
            value={privacyEnabled}
            onValueChange={() => setPrivacyEnabled(!privacyEnabled)}
          />
        )}
      </View>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      <View style={styles.userProfileContainer}>
        <View style={styles.userIconContainer}>
          <Image
            style={styles.userIcon}
            source={{
              uri: "https://via.placeholder.com/150",
            }}
          />
        </View>
        <View>
          <Text style={styles.postDisplayName}>佐藤ゆうた</Text>
          <Text style={styles.postUserName}>@yutasato14hal</Text>
          <Text style={styles.bio}>User1の自己紹介文</Text>
        </View>
      </View>
      <View style={styles.listContainer}>{menuItems.map(renderMenuItem)}</View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  userProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#111",
    borderRadius: 12,
    margin: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userIconContainer: {
    marginRight: 16,
  },
  userIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#cccccc",
  },
  postDisplayName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f9f9f9",
  },
  postUserName: {
    fontSize: 14,
    color: "#9d9d9d",
  },
  bio: {
    fontSize: 12,
    color: "#fdfdfd",
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#111",
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    color: "#f9f9f9",
  },
  actionText: {
    color: "#d02040",
    fontWeight: "bold",
  },
  sectionLabel: {
    color: "#666",
    fontSize: 14,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
