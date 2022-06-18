import React, { ReactNode, useContext } from "react";
import { Typography } from "antd";
import { CustomThemecontext } from "../../theme/themeContext";

const { Text } = Typography;

const TextComponent: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { getColors } = useContext(CustomThemecontext);
  return <Text style={{ color: getColors.textColor }}>{children}</Text>;
};

export default TextComponent;
