import {
  faHeart,
  faStar,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Tabs, Typography } from "antd";
import { useContext } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { Icon } from "src/lib";
import { CustomThemecontext } from "src/theme/themeContext";
import FavoritesTab from "./ProfileTabs/FavoritesTab/favorites.tab";
import ProfileTab from "./ProfileTabs/profile.tab";
import RatedTab from "./ProfileTabs/rated.tab";
import Watchlist from "./ProfileTabs/watchlist.tab";

const { Text } = Typography;

const tabs = [
  {
    label: "Profile",
    icon: faUser,
    route: "profile",
    component: <ProfileTab />,
  },
  {
    label: "Favorites",
    icon: faHeart,
    route: "favorites",
    component: <FavoritesTab />,
  },
  {
    label: "Rated",
    icon: faStar,
    route: "rated",
    component: <FavoritesTab />,
  },
  {
    label: "Watchlist",
    icon: faTicket,
    route: "watchlist",
    component: <FavoritesTab />,
  },
];

const TabLabelItem = ({ label, icon, route }: any) => {
  const { getColors } = useContext(CustomThemecontext);
  return (
    <NavLink
      to={route}
      className="d-flex"
      children={({ isActive }) => (
        <>
          <div className="mr-2">
            <Icon
              icon={icon}
              color={isActive ? getColors.primaryColor : getColors.dullLink}
            />
          </div>
          <div>
            <Text className={!isActive ? "custom-links" : "with-primary"}>
              {label}
            </Text>
          </div>
        </>
      )}
    />
  );
};

const ProfileBodyView = () => {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  return (
    <Row className="pa-4 mt-14">
      <Col span={24}>
        {/* <Row className="mb-8">
          {tabs.map(({ label, icon, route }) => (
            <Col span={4}>
              <TabLabelItem label={label} icon={icon} route={route} />
            </Col>
          ))}
        </Row> */}
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/profile/" element={<ProfileTab />} />
          <Route path="/favorites/" element={<FavoritesTab />} />
          <Route path="/rated/" element={<RatedTab />} />
          <Route path="/watchlist/" element={<Watchlist />} />
        </Routes>
      </Col>
    </Row>
  );
};

export default ProfileBodyView;
