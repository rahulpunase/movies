export interface IThemeColors {
  primaryColor: string;
  textColor: string;
  background: string;
  lightBackground: string;
  dullLink: string;
}

interface IThemes {
  [key: string]: IThemeColors;
}

export const themes: IThemes = {
  dark: {
    primaryColor: "#3066BE",
    background: "#0e0c10",
    lightBackground: "#2a2626",
    textColor: "#fff",
    dullLink: "#a0a1a2",
  },
  light: {
    primaryColor: "black",
    background: "#dadada",
    lightBackground: "#ffffff",
    textColor: "#000000",
    dullLink: "#a0a1a2",
  },
};
