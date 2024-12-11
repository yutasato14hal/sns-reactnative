import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string; // 不要だが、型定義を残しても問題ありません
  darkColor?: string;  // 不要だが、型定義を残しても問題ありません
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = '#333'; // 固定の背景色を設定

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
