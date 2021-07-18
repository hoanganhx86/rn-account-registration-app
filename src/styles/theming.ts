import {createTheming} from '@callstack/react-theme-provider';

import DefaultTheme from './default-theme';
import {Theme} from './types';

export const {ThemeProvider, withTheme, useTheme} =
  createTheming<Theme>(DefaultTheme);
