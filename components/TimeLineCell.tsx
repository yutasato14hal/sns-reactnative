import { Image, StyleSheet, View, Text, Pressable } from "react-native";

import { UserView } from "@/components/UserView";
import { LikeButton } from "@/components/LikeButton";
import { DateTimeText } from "@/components/DateTimeText";
import { id } from "date-fns/locale";
import { create } from "react-test-renderer";

// ◆ 時間に関するデータ
// createdAt, updatedAt, removedAt

// ◆ userに関するデータ
// id, username(@~), displayName, icon(url), bio
// follows, followers
// 公開しないデータはテーブルを分ける
// email, password, blocks, muteds, likes
// 今回は処理の複雑さから実装しない。histories, payments

// このプロジェクトで扱うデータ
// ホーム
// - 投稿 posts (テキストだったり、画像だったり、スタンプだったり)
//     - id [必須]
//     - type (投稿の種別) [必須]
//        - text or stamp
//     - media (画像 or スタンプ) [任意]
//     - body (本文) [任意]
//         - 画像はあって本文がないこともある
//     - likes (いいねされたデータ) [必須]
//         - Xだと以前はユーザーリストのデータだったが、
//           今は数字のみのデータだけを持つ
//     - 投稿したuserに関するデータ [必須]
//     - 時間に関するデータ
//         - createdAt [必須]
//         - updatedAt [任意]
//         - removedAt [任意]

const postData = {
    id: "1",
    type: "text",
    media: "",
    user: {
        id: "1",
        username: "xxxxxxxxxx01",
        displayName: "User 01",
        icon: "",
        bio: "User1の自己紹介",
        follows: 100,
        followers: 200,
    },
    body: "投稿の本文",
    likes: 0,
    meta: {
        createdAt: new Date("2024-10-22 11:11:11"),
    },
};
type TimelineData = {
    id: string;
    type: "text" | "stamp";
    media?: string;
    body?: string;
    likes: number;
    user: {
        id: string;
        username: string;
        displayName: string;
        icon: string;
        bio: string;
        follows: string[];
        followers: string[];
    };
    meta: {
        createdAt: Date;
        updatedAt?: Date;
        removedAt?: Date;
    };
};
export const TimeLineCell = ({ data }: { data: TimelineData }) => {
    return (
        <>
            <View>
                {/* 投稿者の情報 */}
                <UserView user={data.user} />

                {/* 投稿の本文 */}
                <View>
                    <Text style={postStyles.body}>{data.body}</Text>

                    {data.media && (
                        <Pressable>
                            <Image
                                style={postStyles.media}
                                source={{ uri: data.media }}
                            />
                        </Pressable>
                    )}
                </View>

                {/* 投稿のアクション */}
                <View>
                    <LikeButton docId={data.id} likes={data.likes} />
                </View>

                {/* 投稿のメタ情報 */}
                <View>
                    <DateTimeText datetime={data.meta.createdAt} />
                </View>
            </View>
        </>
    );
};

const postStyles = StyleSheet.create({
    common: {
        color: "#F7AD2E",
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0.5,
    },

    body: {
        color: "#fff",
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.65,
        marginBottom: 8,
    },
    media: {
        width: "100%",
        aspectRatio: 16 / 9,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#cccccc",
    },
});
