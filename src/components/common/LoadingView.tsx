import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

import {colors} from '../../styles';

export type LoadingViewProps = {
  dotSize?: number;
  dotColor?: string;
  duration?: number;
  containerStyle?: {
    width?: number;
    height?: number;
    padding?: number;
  };
};

export const LoadingView = React.memo((props: LoadingViewProps) => {
  const {
    dotSize = 32,
    dotColor = colors.primary,
    containerStyle = {
      ...styles.container,
      width: 140,
    },
    duration = 300,
  } = props;
  const borderRadius = dotSize / 2;
  const dotAnimDuration = 800;
  const animVal = useRef({
    first: new Animated.Value(0),
    second: new Animated.Value(0),
    third: new Animated.Value(0),
  });

  const runAnimRef = useRef(() => {
    Animated.loop(
      Animated.stagger(duration, [
        Animated.sequence([
          Animated.timing(animVal.current.first, {
            toValue: 1,
            duration: dotAnimDuration,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          }),
          Animated.timing(animVal.current.first, {
            toValue: 0,
            duration: dotAnimDuration,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animVal.current.second, {
            toValue: 1,
            duration: dotAnimDuration,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          }),
          Animated.timing(animVal.current.second, {
            toValue: 0,
            duration: dotAnimDuration,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          }),
        ]),
        Animated.sequence([
          Animated.timing(animVal.current.third, {
            toValue: 1,
            duration: dotAnimDuration,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          }),
          Animated.timing(animVal.current.third, {
            toValue: 0,
            duration: dotAnimDuration,
            easing: Easing.linear,
            useNativeDriver: true,
            isInteraction: false,
          }),
        ]),
      ]),
    ).start();
  });

  useEffect(() => {
    runAnimRef.current();
  }, []);

  const dotStyle = {
    ...styles.dotStyle,
    width: dotSize,
    height: dotSize,
    backgroundColor: dotColor,
    borderRadius,
  };
  const interpolate: Animated.InterpolationConfigType = {
    inputRange: [0, 0.2, 1],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  };
  return (
    <View testID={'loadingView'} style={[styles.container, containerStyle]}>
      <Animated.View
        style={{
          ...dotStyle,
          opacity: animVal.current.first.interpolate(interpolate),
          transform: [{scale: animVal.current.first}],
        }}
      />
      <Animated.View
        style={{
          ...dotStyle,
          opacity: animVal.current.second.interpolate(interpolate),
          transform: [{scale: animVal.current.second}],
        }}
      />
      <Animated.View
        style={{
          ...dotStyle,
          opacity: animVal.current.third.interpolate(interpolate),
          transform: [{scale: animVal.current.third}],
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  dotStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    opacity: 1,
  },
});
