import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Screen from '../components/common/Screen';
import {Spacer} from '../components/common/Spacer';
import {Text} from '../components/typography/Text';

export default function EmailVerification() {
  return (
    <Screen>
      <View style={styles.container}>
        <Spacer height={80} />
        <Text>
          Please check your email inbox for verification email. You're mostly
          ready to onboard the application
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
