import { useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useLikeData } from "@/hooks/useFirestoreData";

export const LikeButton = ({
    docId,
    likes = 0,
}: {
    docId: string;
    likes: number;
}) => {
    const { liked, updateLikes } = useLikeData(docId);

    return (
        <Pressable
            onPress={() => {
                // ここにfirebaseのlikesを更新する処理を追加する
                updateLikes();
            }}
            style={styles.likeButton}
        >
            <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                style={liked ? styles.likedButtonIcon : styles.likeButtonIcon}
                size={16}
            />
            <Text
                style={liked ? styles.likedButtonText : styles.likeButtonText}
            >
                {likes}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    likeButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    likeButtonIcon: {
        color: "#9d9d9d",
    },
    likeButtonText: {
        color: "#9d9d9d",
        fontSize: 11,
        letterSpacing: 0.5,
    },
    likedButtonIcon: {
        color: "#e0206c",
    },
    likedButtonText: {
        color: "#e0206c",
        fontSize: 11,
        letterSpacing: 0.5,
    },
});
