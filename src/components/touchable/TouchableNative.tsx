import React from 'react';
import {
  GestureResponderEvent,
  Platform,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import {colors} from '../../styles';

export type TouchableNativeProps = TouchableOpacityProps &
  TouchableNativeFeedbackProps &
  TouchableHighlightProps & {
    onPress?: (event: GestureResponderEvent) => void;
    children?: React.ReactNode;
    iosHighlighted?: boolean;
  };

export const TouchableNative = (props: TouchableNativeProps) => {
  const {children, iosHighlighted, ...rest} = props;
  return Platform.select({
    ios: iosHighlighted ? (
      <TouchableHighlight underlayColor={colors.darkGray} {...rest}>
        <View>{children}</View>
      </TouchableHighlight>
    ) : (
      <TouchableOpacity activeOpacity={0.7} {...rest}>
        {children}
      </TouchableOpacity>
    ),
    default: (
      <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
    ),
  });
};
