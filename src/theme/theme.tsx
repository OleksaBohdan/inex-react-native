import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black', // change primary color
    surface: 'white', // change surface color
    background: 'white', // change background color
    text: 'black', // change text color
    disabled: 'gray', // change disabled color
    placeholder: 'gray', // change placeholder color
    notification: 'red',
    backdrop: 'red',
  },
};
