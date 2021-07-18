import color from 'color';

import {colors} from '.';
import fonts from './fonts';
import {Fonts, Theme} from './types';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: colors.primary,
    accent: colors.accent,
    background: colors.contentBackground,
    surface: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    error: colors.danger,
    text: colors.dark,
    textInvert: colors.secondary,
    onBackground: '#000000',
    onSurface: '#000000',
    disabled: color('#000').alpha(0.26).rgb().string(),
    placeholder: color('#000').alpha(0.54).rgb().string(),
    backdrop: color('#000').alpha(0.5).rgb().string(),
    notification: '#78A240',
    lightGray: colors.lightGray,
    darkGray: colors.darkGray,
    transparent: colors.transparent,
  },
  fonts: fonts as Fonts,
};

export default DefaultTheme;
