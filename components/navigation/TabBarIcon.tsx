// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: FontAwesome<ComponentProps<typeof FontAwesome>['name']>) {
  return <FontAwesome size={35} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
