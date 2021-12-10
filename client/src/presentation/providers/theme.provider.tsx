import React from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
};

const theme = createTheme();

export const ThemeProvider: React.FC<Props> = ({ children }: Props) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
