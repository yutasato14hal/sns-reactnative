import { useEffect, useState, useCallback, useMemo } from "react";
import { useFirebase } from "./useFirebase";

import {
    getFirestore,
    getDocs,
    collection,
    limit,
    orderBy,
    query,
    updateDoc,
    increment,
    doc,
    onSnapshot,
} from "firebase/firestore";

// useState
// 状態管理のhooks
// const [count, setCount] = useState(0);
// const [状態変数, 状態変数を変更する関数] = useState(初期値);

// ◆ 時間に関するデータ
// createdAt, updatedAt, removedAt

// ◆ userに関するデータ
// id, username(@~), displayName, icon(url), bio
// follows, followers
// 公開しないデータはテーブルを分ける
// email, password, blocks, muteds, likes
// 今回は処理の複雑さから実装しない。histories, payments

// - 投稿 timeline (テキストだったり、画像だったり、スタンプだったり)
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

export const useTimelineData = () => {
    const [timeline, setTimeline] = useState<TimelineData[]>([]);
    const app = useFirebase();
    const db = useMemo(() => getFirestore(app), [app]);

    const initialize = async () => {
        // dbを使い、データを取得する

        const q = query(collection(db, "version/sa42/timeline"), limit(10));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data: TimelineData[] = [];

            snapshot.docChanges().forEach((change) => {
                console.log(change.doc.data());

                // ドキュメントの追加時
                if (change.type == "added") {
                    const timelineData = change.doc.data();
                    data.push({
                        id: change.doc.id,
                        type: timelineData.type,
                        media: timelineData.media,
                        body: timelineData.body,
                        likes: timelineData.likes,
                        user: timelineData.user,
                        meta: {
                            createdAt: timelineData.meta.createdAt.toDate(),
                            updatedAt: timelineData.meta.updatedAt?.toDate(),
                            removedAt: timelineData.meta.removedAt?.toDate(),
                        },
                    } as TimelineData);
                }
                // ドキュメントの変更時
                if (change.type == "modified") {
                    const targetIndex = timeline.findIndex(
                        (item) => item.id === change.doc.id
                    );
                    const tempTimeline = [...timeline];
                    if (targetIndex !== -1) {
                        // targetIndexを削除
                        tempTimeline.splice(targetIndex, 1);
                        const timelineData = change.doc.data();
                        tempTimeline.push(timelineData as TimelineData);
                        setTimeline(
                            tempTimeline.sort((a, b) => {
                                return (
                                    b.meta.createdAt.getTime() -
                                    a.meta.createdAt.getTime()
                                );
                            })
                        );
                    }
                }
                // ドキュメントの削除時
                if (change.type == "removed") {
                }
            });

            setTimeline((prev) => [...data, ...prev]);
        });
    };

    // 一回しか実行しない
    useEffect(() => {
        initialize();
    }, []);

    // これらを使って下記の関数を実装する
    // useMemo
    // useCallback

    // 追加読み込みの関数
    const fetchMore = useCallback(async () => {
        const q = query(collection(db, "version/sa42/timeline"), limit(10));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                type: data.type,
                media: data.media,
                body: data.body,
                likes: data.likes,
                user: data.user,
                meta: {
                    createdAt: data.meta.createdAt.toDate(),
                    updatedAt: data.meta.updatedAt?.toDate(),
                    removedAt: data.meta.removedAt?.toDate(),
                },
            } as TimelineData;
        });
        setTimeline((prev) => [...data, ...prev]);
    }, []);

    // refreshの関数
    const refresh = useCallback(() => {
        initialize();
    }, []);

    // タイムラインの更新のトリガーを受け取り、
    // 自動で追加を行う関数

    // 読み込みを止める関数 今回は未実装

    return {
        timeline, // 状態変数
        fetchMore, // 追加読み込みの関数
        refresh, // refreshの関数
    };
};

export const useLikeData = (docId: string) => {
    const app = useFirebase();
    const db = useMemo(() => getFirestore(app), [app]);

    const [liked, setLiked] = useState(false);

    const updateLikes = useCallback(() => {
        // いいねの更新処理
        const ref = doc(db, "version/sa42/timeline", docId);
        updateDoc(ref, {
            likes: increment(liked ? -1 : 1),
        });

        setLiked(!liked);
    }, []);

    return {
        liked,
        updateLikes,
    };
};
