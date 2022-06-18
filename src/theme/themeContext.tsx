import { ConfigProvider } from "antd";
import React, { ReactNode, useState } from "react";
import { IThemeColors, themes } from "./theme";

export interface ICustomThemecontext {
  children: ReactNode;
}

export const CustomThemecontext = React.createContext<{
  theme: string;
  changeTheme: (theme: string) => void;
  getColors: IThemeColors;
}>({
  theme: "dark",
  changeTheme: (theme: string) => {},
  getColors: {
    primaryColor: "#ea1b24",
    background: "#0e0c10",
    lightBackground: "#19171f",
    textColor: "#ffffff",
    dullLink: "#a0a1a2",
  },
});

export const ThemeContextProvider: React.FC<ICustomThemecontext> = ({
  children,
}) => {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const changeTheme = (theme: string) => setSelectedTheme(theme);

  ConfigProvider.config({
    theme: {
      primaryColor: themes[selectedTheme].primaryColor,
    },
  });

  return (
    <CustomThemecontext.Provider
      value={{
        theme: selectedTheme,
        changeTheme: changeTheme,
        getColors: themes[selectedTheme],
      }}
    >
      <ConfigProvider>{children}</ConfigProvider>
    </CustomThemecontext.Provider>
  );
};
