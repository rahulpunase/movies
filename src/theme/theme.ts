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
    primaryColor: "#ea1b24",
    background: "#0e0c10",
    lightBackground: "#19171f",
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
