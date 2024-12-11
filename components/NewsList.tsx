import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NewsList = () => {
  const newsItems = [
    {
      id: 1,
      userName: "ひろさわ",
      title: "さんからいいねされました",
      description: "本文本文本文本文本文本文本文本文",
      userIcon: "https://via.placeholder.com/150",
      iconType: "like",
      time: "1日",
    },
    {
      id: 2,
      userName: "",
      title: "お知らせが届きました",
      description: "本文本文本文本文本文本文本文本文",
      userIcon: "",
      iconType: "bell",
      time: "1日",
    },
    {
      id: 3,
      userName: "さちこ",
      title: "さんからフォローされました",
      description: "",
      userIcon: "https://via.placeholder.com/150",
      iconType: "follow",
      time: "1日",
    },
    {
      id: 4,
      userName: "こいずみ",
      title: "さんから返信がありました",
      description: "",
      userIcon: "https://via.placeholder.com/150",
      iconType: "reply",
      time: "1日",
    },
  ];

  const renderIcon = (type: string, isUserIcon: string) => {
    const iconData = {
      like: { style: styles.like, name: "heart-o", library: Icon },
      bell: { style: styles.bell, name: "bell-o", library: Icon },
      follow: { style: styles.follow, name: "user-o", library: Icon },
      reply: { style: styles.reply, name: "message-reply-outline", library: MaterialCommunityIcons },
    };

    const IconComponent = iconData[type]?.library;

    if (!IconComponent) return null; // タイプが無効なら何も描画しない

    if (type === "bell" && isUserIcon) {
      return (
        <View style={styles.userIcon}> {/* Apply userIcon style for bell */}
          <IconComponent name={iconData[type].name} size={20} color="black" />
        </View>
      );
    }

    return (
      <View style={isUserIcon ? styles.userIcon : [styles.icon, iconData[type].style]}>
        <IconComponent name={iconData[type].name} size={isUserIcon ? 20 : 12} color="black" />
      </View>
    );
  };

  return (
    <View style={styles.newsList}>
      {newsItems.map((item) => (
        <View style={styles.newsItem} key={item.id}>
          {/* ユーザーアイコンまたは通知アイコン */}
          {item.iconType === "bell" ? (
            renderIcon(item.iconType, true)
          ) : item.userIcon ? (
            <Image source={{ uri: item.userIcon }} style={styles.userIcon} />
          ) : (
            renderIcon(item.iconType)
          )}
          {item.iconType !== "bell" && renderIcon(item.iconType)} {/* Hide absolute positioned icon for bell */}
          <View style={styles.newsContent}>
            {/* ユーザー名とタイトル */}
            <Text style={styles.newsTitle}>
              {item.userName ? `${item.userName} ` : ""}
              {item.title}
            </Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
          </View>
          <Text style={styles.newsTime}>{item.time}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  newsList: {
    width: "100%",
    backgroundColor: "#333333",
  },
  newsItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
    borderBottomColor: "#F7AD2E",
    paddingVertical: 20,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow", /* Added yellow background for bell */
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: "absolute",
    left: 25,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  like: {
    backgroundColor: "pink",
  },
  bell: {
    backgroundColor: "yellow",
  },
  follow: {
    backgroundColor: "teal",
  },
  reply: {
    backgroundColor: "blue",
  },
  newsContent: {
    flex: 1,
    marginLeft: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fdfdfd",
  },
  newsDescription: {
    fontSize: 14,
    color: "#8e826f",
  },
  newsTime: {
    fontSize: 12,
    color: "#8e826f",
  },
});

export default NewsList;
