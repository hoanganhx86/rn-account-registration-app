import Color from 'color';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {useTheme} from '../../styles/theming';
import {ConditionalWrap} from './ConditionalWrap';
import {LoadingView} from './LoadingView';

type ScreenProps = {
  children?: ReactNode;
  enableSafeArea?: boolean;
  enableKeyboardAvoidingView: boolean;
  statusBarColor?: string;
  withLoadingView?: boolean;
  showLoading?: boolean;
  title?: string;
  navBar?: ReactNode;
};

const Screen = (props: ScreenProps) => {
  const {
    colors: {background, backdrop},
  } = useTheme();
  const {
    enableSafeArea,
    withLoadingView,
    showLoading = undefined,
    navBar,
    enableKeyboardAvoidingView = false,
  } = props;

  let NestedEle = enableSafeArea ? (
    <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
      {navBar}
      {props.children}
    </SafeAreaView>
  ) : (
    <View style={[styles.container, {backgroundColor: background}]}>
      {navBar}
      {props.children}
    </View>
  );

  const fadeInAnimRef = useRef(new Animated.Value(1));
  const [completeHideLoadingView, setCompleteHideLoadingView] = useState(true);
  useEffect(() => {
    if (!completeHideLoadingView && !showLoading) {
      setCompleteHideLoadingView(false);
      Animated.timing(fadeInAnimRef.current, {
        toValue: 0,
        easing: Easing.quad,
        duration: 250,
        isInteraction: true,
        useNativeDriver: true,
      }).start(() => setCompleteHideLoadingView(true));
    }
  }, [completeHideLoadingView, showLoading]);
  NestedEle =
    showLoading !== undefined || withLoadingView ? (
      <View style={[styles.container]}>
        {NestedEle}
        {withLoadingView && (showLoading || !completeHideLoadingView) && (
          <Animated.View
            style={[
              styles.loadingView,
              {
                opacity: fadeInAnimRef.current,
                backgroundColor: Color(backdrop).alpha(0.5).string(),
              },
            ]}>
            <LoadingView
              dotSize={32}
              containerStyle={styles.loadingIndicatorStyle}
            />
          </Animated.View>
        )}
      </View>
    ) : (
      NestedEle
    );

  return (
    <ConditionalWrap
      condition={enableKeyboardAvoidingView}
      wrap={children =>
        Platform.select({
          ios: (
            <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
              {children}
            </KeyboardAvoidingView>
          ),
          default: <View style={styles.wrapper}>{children}</View>,
        })
      }>
      <StatusBar barStyle="dark-content" />
      {NestedEle}
    </ConditionalWrap>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicatorStyle: {
    width: 140,
  },
});

Screen.defaultProps = {
  enableSafeArea: true,
  withLoadingView: false,
  enableKeyboardAvoidingView: true,
};

export default Screen;
