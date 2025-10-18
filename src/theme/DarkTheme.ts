import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const DarkTheme: ThemeTypes = {
  name: 'DarkTheme',
  dark: false,
  variables: {
    'border-color': '#13A3DD',
    'carousel-control-size': 10
  },
  colors: {
    primary: '#13A3DD',
    secondary: '#13A3DD',
    secondary0: '#f2fde4',
    secondary1: '#DCEDC8',
    secondary2: '#C5E1A5',
    secondary3: '#AED581',
    secondary4: '#9CCC65',
    secondary5: '#8BC34A',
    secondary6: '#7CB342',
    secondary7: '#689F38',
    secondary8: '#558B2F',
    secondary9: '#33691E',
    info: '#03c9d7',
    success: '#00c853',
    accent: '#FFAB91',
    warning: '#ffc107',
    error: '#f44336',
    lightprimary: '#f0f3f6',
    lightsecondary: '#ede7f6',
    lightsuccess: '#b9f6ca',
    lighterror: '#f9d8d8',
    lightwarning: '#fff8e1',
    darkText: '#212121',
    lightText: '#616161',
    darkprimary: '#1565c0',
    darksecondary: '#4527a0',
    borderLight: '#d0d0d0',
    inputBorder: '#787878',
    containerBg: '#f6f6f6',
    // containerBg: '#f0f2f6',
    surface: '#fff',
    'on-surface-variant': '#fff',
    facebook: '#4267b2',
    twitter: '#1da1f2',
    linkedin: '#0e76a8',
    gray100: '#fafafa',
    primary200: '#90caf9',
    secondary200: '#b39ddb'
  }
};

export { DarkTheme };
