import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Tabs
  // - ホーム - index.tsx
  // - お知らせ - news.tsx
  // - 検索 - search.tsx
  // - マイページ - mypage.tsx
  // - 設定 - explore.tsx => settings.tsx

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
  // - 投稿 (テキストだったり、画像だったり、スタンプだったり)
  //     - id [必須]
  //     - type (投稿の種別) [必須]
  //        - text or stamp
  //     - media (画像 or スタンプ) [任意]
  //     - body (本文) [任意]
  //        - 画像はあって本文がないこともある
  //        - スタンプはtypeがstampで本分にURLを書く
  //     - likes (いいねされたデータ) [必須]
  //        - Xだと以前はユーザーリストのデータだったが、
  //           今は数字のみのデータだけを持つ
  //     - 投稿したuserに関するデータ [必須]
  //     - 時間に関するデータ
  //        - createdAt [必須]
  //        - updatedAt [任意]
  //        - removedAt [任意]

  // お知らせ
  // ‐ お知らせ
  //    ‐ id [必須]
  //    ‐ title (タイトル) [必須]
  //    ‐ body (本文) [任意]
  //    ‐ media (画像) [任意]
  //    ‐ link (リンク) [任意]
  //    ‐ sourse (ソース) [必須]
  //        - 運営
  //        - ユーザーアクション
  //        - その他
  //    ‐ startAt (表示開始日時) [必須]
  //    ‐ endAt (表示終了日時) [任意]

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#333" },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home" color="#d1d1d1" />
          ),
          tabBarBadge: "new",
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "お知らせ",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="newspaper-o" color="#d1d1d1" />
          ),
          tabBarBadge: 3,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "検索",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="search" color="#d1d1d1" />
          ),
        }}
      />

      <Tabs.Screen
        name="mypage"
        options={{
          title: "マイページ",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="user" color="#d1d1d1" />
          ),
        }}
      />
    </Tabs>
  );
}
