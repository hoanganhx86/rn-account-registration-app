import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useCallback, useRef, useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import * as yup from 'yup';

import {Button, ButtonType} from '../components/button/Button';
import Screen from '../components/common/Screen';
import {Spacer} from '../components/common/Spacer';
import {FormInput, FormInputType} from '../components/input/FormInput';
import {Text} from '../components/typography/Text';
import {register} from '../services/main';
import {colors} from '../styles';
import {useTheme} from '../styles/theming';

const Registration = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [isRequesting, setIsRequesting] = useState(false);
  const usernameInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);
  const [error, setError] = useState<String>();
  const [signUpSchema] = useState(
    yup.object().shape({
      username: yup
        .string()
        .trim()
        .email('Invalid email address.')
        .required('*Required'),
      password: yup.string().min(3).required('*Required'),
      name: yup.string().required('*Required'),
    }),
  );

  const onSubmit = useCallback(
    async values => {
      Keyboard.dismiss();
      setIsRequesting(true);

      const {username, password, name} = signUpSchema.cast(values);
      try {
        const res = await register(username!, password!, name!);
        if (res.ok) {
          navigation.navigate('EmailVerification');
        } else {
          setError(res.data as string);
        }
      } catch (err) {
        setError('Unknown error.');
      }
      setIsRequesting(false);
    },
    [navigation, signUpSchema],
  );

  return (
    <Screen showLoading={isRequesting} withLoadingView>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        overScrollMode="always"
        showsVerticalScrollIndicator={false}>
        <Spacer height={80} />
        <Formik
          enableReinitialize={true}
          validateOnBlur={true}
          validateOnChange={false}
          validationSchema={signUpSchema}
          initialValues={{
            username: '',
            password: '',
            name: '',
          }}
          onSubmit={onSubmit}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.formContainer}>
              <FormInput
                ref={usernameInputRef}
                testID={'usernameInput'}
                type={FormInputType.Email}
                style={styles.input}
                onChangeText={text => {
                  if (error) {
                    // clear server error
                    setError(undefined);
                  }
                  handleChange('username')(text);
                }}
                onBlur={handleBlur('username')}
                onSubmitEditing={() => {
                  passwordInputRef?.current?.focus();
                }}
                value={values.username}
                blurOnSubmit={true}
                autoCorrect={false}
                autoFocus={false}
                placeholder="Input email address eg. me@gmail.com"
                label="Username"
                autoCapitalize="none"
                returnKeyType="next"
                errorMessage={errors.username as string}
              />
              <FormInput
                ref={passwordInputRef}
                testID={'passwordInput'}
                type={FormInputType.Password}
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                onSubmitEditing={() => {
                  nameInputRef?.current?.focus();
                }}
                value={values.password}
                blurOnSubmit={false}
                autoCorrect={false}
                autoFocus={false}
                placeholder="Input password, length must be > 2"
                label="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="next"
                errorMessage={errors.password as string}
              />
              <FormInput
                ref={nameInputRef}
                testID={'nameInput'}
                type={FormInputType.Email}
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                onSubmitEditing={() => {
                  handleSubmit();
                }}
                value={values.name}
                blurOnSubmit={true}
                autoCorrect={false}
                autoFocus={false}
                placeholder="Input your name"
                label="Full name"
                autoCapitalize="words"
                returnKeyType="done"
                errorMessage={errors.name as string}
              />
              {error && (
                <Text style={[styles.error, {color: theme.colors.error}]}>
                  {error}
                </Text>
              )}
              <Button
                testID={'registerBtn'}
                type={ButtonType.Primary}
                buttonStyle={styles.registerButton}
                onPress={() => {
                  setError(undefined);
                  handleSubmit();
                }}
                label="Register"
              />
              <Spacer height={40} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  formContainer: {
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  input: {
    marginBottom: 16,
  },
  registerButton: {
    height: 48,
    marginTop: 16,
  },
  error: {
    marginVertical: 8,
  },
});

export default Registration;
