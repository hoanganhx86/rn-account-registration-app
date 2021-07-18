import React from 'react';
import {StyleProp, Text as NativeText, TextStyle} from 'react-native';

import {useTheme} from '../../styles/theming';

type TextProps = React.ComponentProps<typeof NativeText> & {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export const Text = (props: TextProps) => {
  const {style, children, ...rest} = props;
  const theme = useTheme();
  const styleWithTheme: StyleProp<TextStyle> = {
    ...theme.fonts.regular,
    color: theme.colors.text,
    textAlign: 'left',
  };

  return (
    <NativeText {...rest} style={[styleWithTheme, style]}>
      {children}
    </NativeText>
  );
};
