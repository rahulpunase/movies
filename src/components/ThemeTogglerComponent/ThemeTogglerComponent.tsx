import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { CustomThemecontext } from "src/theme/themeContext";

const ThemeTogglerComponent = () => {
  const { changeTheme, theme, getColors } = useContext(CustomThemecontext);
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
    >
      {
        <FontAwesomeIcon
          size="lg"
          color={getColors.textColor}
          icon={theme === "light" ? faToggleOff : faToggleOn}
        />
      }
    </div>
  );
};

export default ThemeTogglerComponent;
