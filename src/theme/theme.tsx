import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    surface: 'white',
    background: 'white',
    text: 'black',
    disabled: 'gray',
    placeholder: 'gray',
    notification: 'gray',
    backdrop: 'rgba(128, 128, 128, 0.5)',
  },
};
