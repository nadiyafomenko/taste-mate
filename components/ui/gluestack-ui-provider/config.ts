'use client';

import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from "@gluestack-ui/themed";

const customConfig = {
  tokens: {
    colors: {
      primary0: '#7B9D62',
      primary50: '#7B9D62',
      primary100: '#7B9D62',
      primary200: '#7B9D62',
      primary300: '#7B9D62',
      primary400: '#7B9D62',
      primary500: '#7B9D62',
      primary600: '#5C7A43',
      primary700: '#5C7A43',
      primary800: '#5C7A43',
      primary900: '#5C7A43',
      primary950: '#5C7A43',

      secondary50: '#D4B696',
      secondary100: '#D4B696',
      secondary200: '#D4B696',
      secondary300: '#D4B696',
      secondary400: '#D4B696',
      secondary500: '#D4B696',
      secondary600: '#B39374',
      secondary700: '#B39374',
      secondary800: '#B39374',
      secondary900: '#B39374',
      secondary950: '#B39374',

      backgroundLight0: '#FFFFFF',
      backgroundLight50: '#F8F7F4',
      backgroundLight100: '#F8F7F4',
      backgroundLight200: '#F8F7F4',
      backgroundLight300: '#F8F7F4',
      backgroundLight400: '#F8F7F4',
      backgroundLight500: '#F8F7F4',

      backgroundDark0: '#1A1A1A',
      backgroundDark50: '#1A1A1A',
      backgroundDark100: '#1A1A1A',
      backgroundDark200: '#1A1A1A',
      backgroundDark300: '#1A1A1A',
      backgroundDark400: '#1A1A1A',
      backgroundDark500: '#1A1A1A',

      textLight50: '#1A1A1A',
      textLight100: '#1A1A1A',
      textLight200: '#1A1A1A',
      textLight300: '#1A1A1A',
      textLight400: '#404040',
      textLight500: '#404040',
      textLight600: '#404040',
      textLight700: '#404040',
      textLight800: '#404040',
      textLight900: '#1A1A1A',

      textDark50: '#FFFFFF',
      textDark100: '#FFFFFF',
      textDark200: '#FFFFFF',
      textDark300: '#FFFFFF',
      textDark400: '#E0E0E0',
      textDark500: '#E0E0E0',
      textDark600: '#E0E0E0',
      textDark700: '#E0E0E0',
      textDark800: '#E0E0E0',
      textDark900: '#FFFFFF',

      borderLight50: '#CCCCCC',
      borderLight100: '#CCCCCC',
      borderLight200: '#CCCCCC',
      borderLight300: '#CCCCCC',
      borderLight400: '#CCCCCC',
      borderLight500: '#CCCCCC',

      borderDark50: '#404040',
      borderDark100: '#404040',
      borderDark200: '#404040',
      borderDark300: '#404040',
      borderDark400: '#404040',
      borderDark500: '#404040'
    }
  }
};

export const config = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      ...customConfig.tokens.colors,
    },
  },
  globalStyle: {
    variants: {
      light: {
        bg: { value: 'backgroundLight0' },
        color: { value: 'textLight900' }
      },
      dark: {
        bg: { value: 'backgroundDark0' },
        color: { value: 'textDark100' }
      }
    }
  }
} as const);
