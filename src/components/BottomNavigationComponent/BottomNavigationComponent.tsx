import {
  faHeart,
  faList,
  faPerson,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Badge, Col, Row } from "antd";
import { Icon } from "src/lib";
import { animated, useSpring } from "react-spring";
import { useSelector } from "react-redux";
import { TRootState } from "src/redux/store";
import { useContext } from "react";
import { CustomThemecontext } from "src/theme/themeContext";
import { NavLink } from "react-router-dom";
import styles from "./BottomNavigationComponent.module.scss";

const BottomNavigationComponent = () => {
  const { getColors } = useContext(CustomThemecontext);
  const props = useSpring({
    to: { opacity: 1, transform: "translateY(0px)" },
    from: { opacity: 0, transform: "translateY(80px)" },
    delay: 300,
  });

  const { favorites } = useSelector(
    (store: TRootState) => store.profilereducer
  );

  const isActive = ({ isActive }: any) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  return (
    <animated.div style={props}>
      <Row
        className={`pa-2 theme-primary-background-op ${styles.BottomNavigationComponent}`}
      >
        <Col span={6} className="d-flex justify-center align-center">
          <NavLink to="/u/favorites/" className={isActive}>
            <Badge
              color={getColors.primaryColor}
              count={favorites.results.length}
            >
              <Icon size="2x" icon={faHeart} className={styles.icon} />
            </Badge>
          </NavLink>
        </Col>
        <Col span={6} className="d-flex justify-center align-center">
          <NavLink to="/u/watchlist/" className={isActive}>
            <Icon size="2x" icon={faTicket} className={styles.icon} />
          </NavLink>
        </Col>
        <Col span={6} className="d-flex justify-center align-center">
          <Icon size="2x" icon={faList} className={styles.icon} />
        </Col>
        <Col span={6} className="d-flex justify-center align-center">
          <NavLink to="/u/profile/" className={isActive}>
            <Icon size="2x" icon={faUser} className={styles.icon} />
          </NavLink>
        </Col>
      </Row>
    </animated.div>
  );
};

export default BottomNavigationComponent;
