import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CustomThemecontext } from "src/theme/themeContext";
const Icon = (props: FontAwesomeIconProps) => {
  const { getColors } = useContext(CustomThemecontext);
  return (
    <FontAwesomeIcon {...props} color={props.color || getColors.textColor} />
  );
};

export default Icon;
