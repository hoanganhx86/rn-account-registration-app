import React, {useMemo} from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

import * as AppStyle from '../../styles';
import {useTheme} from '../../styles/theming';
import {TouchableNative} from '../touchable/TouchableNative';
import {Caption} from '../typography/Caption';

export enum ButtonType {
  Primary,
  Secondary,
  Outlined,
  Color,
  Link,
  GhostPrimary,
  GhostSecondary,
}

export enum ButtonModifier {
  Small,
  Large,
  Disabled,
  Icon,
  IconOnly,
}

export type ButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  label?: string;
  childView?: React.ReactNode;
  leftIcon?: string;
  type?: ButtonType;
  buttonStyle?: {};
  textStyle?: {};
  testID?: string;
  enabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  const theme = useTheme();
  const {
    onPress,
    label,
    testID,
    type,
    buttonStyle,
    textStyle,
    childView,
    enabled,
  } = props;

  const {internalButtonStyle, internalTextStyle} = useMemo(() => {
    switch (type) {
      case ButtonType.Primary:
        return {
          internalButtonStyle: {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.roundness,
          },
          internalTextStyle: {
            color: theme.colors.textInvert,
          },
        };
      case ButtonType.Secondary:
        return {
          internalButtonStyle: {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.roundness,
            shadowColor: theme.colors.lightGray,
            shadowOpacity: 0.5,
            shadowRadius: 1,
            shadowOffset: {width: 0, height: 1},
            elevation: 5,
          },
          internalTextStyle: {
            color: AppStyle.colors.primary,
            fontSize: 18,
          },
        };
      case ButtonType.Outlined:
        return {
          internalButtonStyle: {
            borderWidth: 1,
            borderColor: AppStyle.colors.primary,
            borderRadius: theme.roundness,
          },
          internalTextStyle: {
            color: AppStyle.colors.primary,
            ...theme.fonts.medium,
          },
        };
      default:
        return {
          internalButtonStyle: {
            backgroundColor: AppStyle.colors.primary,
            borderRadius: theme.roundness,
          },
          internalTextStyle: {
            color: AppStyle.colors.secondary,
          },
        };
    }
  }, [theme, type]);
  return (
    <TouchableNative
      testID={testID}
      activeOpacity={enabled ? 0.7 : 1.0}
      onPress={enabled ? onPress : (null as any)}>
      <View style={[internalButtonStyle, styles.alignCenter, buttonStyle]}>
        {label && (
          <Caption family="bold" style={[internalTextStyle, textStyle]}>
            {label}
          </Caption>
        )}
        {childView && childView}
      </View>
    </TouchableNative>
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    height: 48,
    minWidth: 60,
  },
});

Button.defaultProps = {
  type: ButtonType.Primary,
  buttonStyle: styles.default,
  textStyle: {},
  enabled: true,
};
