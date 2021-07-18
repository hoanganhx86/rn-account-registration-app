import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

import {StyledText} from './StyledText';

type Props = React.ComponentProps<typeof Text> & {
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  family: 'regular' | 'medium' | 'light' | 'thin' | 'bold';
  autoScale?: boolean;
};

export const Caption = (props: Props) => (
  <StyledText {...props} style={[styles.text, props.style]} />
);

Caption.defaultProps = {
  family: 'regular',
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 16,
    marginHorizontal: 0,
    letterSpacing: 0,
  },
});
