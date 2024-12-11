import {
  StyleSheet, // スタイルシート関連で使用
  Image, // ユーザー画像で使用
  View,
  Text,
  Pressable, // アイコンやユーザー名をクリックしたときの挙動で使用
} from "react-native";

import { useState } from "react";

// user: {
//     id: '1',
//     username: 'user1',
//     displayName: 'User1',
//     icon: '',
//     bio: 'User1の自己紹介',
//     follows: 100,
//     followers: 200,
// }

export const UserView = ({ user }) => {
  console.log(user);
  const [isFollowed, setIsFollowed] = useState(user.follows);

  return (
    <View style={styles.userViewContainer}>
      <View style={styles.postUserContainer}>
        {/* 投稿者のアイコン */}
        <Pressable>
          <View style={styles.userIconContainer}>
            <Image
              style={styles.userIcon}
              source={{
                uri: user.icon,
              }}
            />
          </View>
        </Pressable>
        <View>
          <Text style={styles.postDisplayName}>{user.displayName}</Text>
          <Text style={styles.postUserName}>@{user.username}</Text>
        </View>
      </View>
      <View>
        <Pressable
          style={styles.followButton}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          <Text style={{color:'#333', fontWeight:'bold'}}>{isFollowed ? "フォロー中" : "フォロー"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userViewContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postUserContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  postUserName: {
    color: "#9d9d9d",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  postDisplayName: {
    color: "#F7AD2E",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  userIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    backgroundColor: "#dddddd",
    borderRadius: 21,
  },
  userIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#cccccc",
  },
  followButton: {
    backgroundColor: "#F7AD2E",
    minWidth: "100px",
    alignItems: "center",
    fontWeight: "bold",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 9999,
  },
});
