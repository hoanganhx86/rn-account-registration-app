import color from 'color';
import React from 'react';
import {StyleProp, TextProps, TextStyle} from 'react-native';

import {useTheme} from '../../styles/theming';
import {Text} from './Text';

type StyledTextProps = React.ComponentProps<typeof Text> & {
  style?: StyleProp<TextStyle>;
  alpha?: number;
  family: 'bold' | 'regular' | 'medium' | 'light' | 'thin';
  autoScale?: boolean; // iOS only
  minScale?: number;
};

export const StyledText = (props: StyledTextProps) => {
  const {style, family, alpha = 1, autoScale, minScale, ...rest} = props;
  const theme = useTheme();
  const textColor = color(theme.colors.text).alpha(alpha).rgb().string();
  const styleWithTheme: StyleProp<TextStyle> = {
    ...theme.fonts[family],
    color: textColor,
    textAlign: 'left',
  };

  const autoScaleProps: TextProps = autoScale
    ? {
        numberOfLines: 1,
        adjustsFontSizeToFit: true,
        minimumFontScale: minScale,
        ellipsizeMode: 'tail',
      }
    : {};

  return <Text {...autoScaleProps} {...rest} style={[styleWithTheme, style]} />;
};

StyledText.defaultProps = {
  autoScale: false,
  minScale: 0.625,
};
