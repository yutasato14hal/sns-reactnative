import { Text, StyleSheet } from 'react-native';

type DateTimeTextProps = {
    datetime: Date
}

// typescriptは型を指定することができる
// DateTimeTextProps型を作り、datetimeプロパティにはDate型を指定する

// 初期値の設定を行うこともできる
// datetimeには初期値 new Date()を指定している

// date-fnsを使って、xx分前という文字列を出力します。
// npm install date-fns

// date-fnsの読み込み
import { formatDistanceToNow } from 'date-fns'
// formatDistanceToNowは現在時刻と指定時刻を比べて差分を表示してくれる関数

// 日本語設定の読み込み
import { ja } from 'date-fns/locale'


export const DateTimeText = ({ datetime = new Date() }: DateTimeTextProps) => {
    return <Text style={styles.dateTimeText}>
        {/* 2024年10月16日 10時10分10秒 */}
        {
            formatDistanceToNow(datetime, {
                locale: ja,
                addSuffix: true
            })
        }
    </Text>
}

const styles = StyleSheet.create({
    dateTimeText: {
        fontSize: 11,
        color: '#F7AD2E',
    }
})
