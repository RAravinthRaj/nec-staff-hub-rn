/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { createTheme } from "@rneui/themed";

const lightColors = {
  primary: "#2640C2",
  secondary: "#207CC9",
  tertiary: "#A0C4FF",
  background: "#e2e2e2",
  white: "#ffffff",
  black: "#000000",
  red: "#EA0000",
  orange: "#FF6F00",
  green: "#39FF14",
  secondaryBackground: "#FAFAFC",
  border: "#A8A8A8",
  badgeGreen: "#008000",
};

const darkColors = {
  primary: "#2640C2",
  secondary: "#207CC9",
  tertiary: "#A0C4FF",
  background: "#121212",
  white: "#ffffff",
  black: "#000000",
  red: "#EA0000",
  orange: "#FF6F00",
  green: "#39FF14",
  secondaryBackground: "#FAFAFC",
  border: "#A8A8A8",
};

type ThemeMode = "light" | "dark";

export const buildTheme = (mode: ThemeMode) => {
  const colors = mode === "dark" ? darkColors : lightColors;

  const theme = createTheme({
    lightColors: colors,
    darkColors: colors,
  });

  return {
    ...theme,
    colors,
  };
};
