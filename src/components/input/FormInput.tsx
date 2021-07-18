import React, {Ref, useCallback, useRef, useState} from 'react';
import {StyleSheet, TextInput as OriginalTextInput, View} from 'react-native';
import {colors} from '../../styles';
import {useTheme} from '../../styles/theming';
import {Theme} from '../../styles/types';
import {Caption} from '../typography/Caption';

export enum FormInputType {
  Text,
  Email,
  Password,
  url,
}

export type FormInputProps = React.ComponentPropsWithRef<
  typeof OriginalTextInput
> & {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  inputHeight?: number;
  type?: FormInputType;
  testID?: string;
  mode?: 'flat' | 'outlined';
  disabled?: boolean;
  value?: string;
  onChangeText?: Function;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  selectionColor?: string;
  underlineColor?: string;
  padding?: 'none' | 'normal';
  multiline?: boolean;
  numberOfLines?: number;
  inputStyle?: {};
  theme?: Theme;
  captionCharInput?: string;
  isDropbox?: boolean;
  isIconDropbox?: boolean;
};

export const FormInput = React.forwardRef(
  (props: FormInputProps, receivedRef: Ref<OriginalTextInput>) => {
    const {
      label,
      placeholder,
      errorMessage,
      style,
      inputStyle,
      testID,
      disabled,
      onInputFocus,
      onInputBlur,
      ...rest
    } = props;
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const fallbackRef = useRef(null);
    const ref = receivedRef || fallbackRef;
    const onFocus = useCallback(() => {
      setFocused(true);
      onInputFocus && onInputFocus();
    }, [onInputFocus]);
    const onBlur = useCallback(() => {
      setFocused(false);
      onInputBlur && onInputBlur();
    }, [onInputBlur]);

    return (
      <View
        style={[
          styles.container,
          focused ? styles.containerFocused : {},
          style,
        ]}>
        {label && (
          <Caption
            testID={`${testID}.label`}
            style={[
              styles.label,
              focused
                ? {color: theme.colors.primary}
                : {
                    ...styles.errorMessage,
                    color: theme.colors.error,
                  }
                ? {color: theme.colors.text}
                : {},
            ]}>
            {label}
          </Caption>
        )}
        <View
          testID={`${testID}.inputContainer`}
          style={[
            styles.textInputOutline,
            {
              borderColor: theme.colors.darkGray,
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.onSurface,
            },
            focused ? {borderColor: theme.colors.primary} : {},
            errorMessage ? {borderColor: theme.colors.error} : {},
          ]}
          pointerEvents={disabled ? 'none' : 'auto'}>
          <OriginalTextInput
            {...rest}
            testID={testID}
            placeholder={placeholder}
            ref={ref}
            editable={!disabled}
            underlineColorAndroid={theme.colors.transparent}
            style={[styles.textInput, {color: theme.colors.text}, inputStyle]}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholderTextColor={colors.darkGray}
          />
        </View>
        <Caption
          testID={`${testID}.errorMessage`}
          style={[
            errorMessage
              ? {
                  ...styles.errorMessage,
                  color: theme.colors.error,
                }
              : styles.errorMessageEmpty,
          ]}>
          {errorMessage}
        </Caption>
      </View>
    );
  },
);

FormInput.defaultProps = {
  type: FormInputType.Text,
  isDropbox: false,
};

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
  },
  containerFocused: {
    minHeight: 48,
  },
  textInput: {
    height: 48,
    minHeight: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'normal',
  },
  textInputOutline: {
    borderWidth: 1,
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  errorMessageEmpty: {
    height: 0,
  },
  errorMessage: {
    fontSize: 12,
    height: 16,
  },
  label: {
    marginBottom: 8,
    padding: 0,
    margin: 0,
    fontSize: 16,
    lineHeight: 16,
  },
});
