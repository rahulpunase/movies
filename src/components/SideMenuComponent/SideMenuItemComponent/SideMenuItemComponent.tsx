import { Typography } from "antd";
import styles from "./SideMenuItem.module.scss";
import { NavLink } from "react-router-dom";

export interface ISideMenuItemComponent {
  to: string;
  image: string;
  label: string;
}

export const SideMenuItemComponent: React.FC<ISideMenuItemComponent> = ({
  to,
  image,
  label,
}) => {
  return (
    <div className={`${styles.SideMenuItem} mb-2`}>
      <NavLink
        to={to}
        className={({ isActive }) => `${isActive ? styles.active : ""}`}
      >
        <div
          className={styles.backgroundImage}
          style={{
            background: `url(${image})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className={`${styles.label} pa-2`}>
          <Typography.Text>{label}</Typography.Text>
        </div>
      </NavLink>
    </div>
  );
};
