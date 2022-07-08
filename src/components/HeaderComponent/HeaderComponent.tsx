import { Col, Divider, Dropdown, Menu, Row, Tooltip, Typography } from "antd";
import React, { useContext } from "react";
import { CustomThemecontext } from "src/theme/themeContext";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { ThemeTogglerComponent } from "src/components";
import { Icon } from "src/lib";
import {
  faUser,
  faSignIn,
  faDog,
  faHeart,
  faStar,
  faTicket,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, TRootState } from "src/redux/store";
import { logoutUser } from "src/redux/ducks/profile.slice";
import { supabase } from "src/services/instance/supabase.instance";

const { Text } = Typography;

const HeaderComponent = () => {
  const isActive = ({ isActive }: any) =>
    `custom-links ${isActive ? "active" : ""}`;
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    isAuthenticated,
    profile: { isUpdateRequired, username },
  } = useSelector((store: TRootState) => store.profilereducer);
  const handleMenuClick = (item: any) => {
    switch (item.key) {
      case "4":
        supabase.auth.signOut().then((_: any) => dispatch(logoutUser()));
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: (
            <Link to="/u/profile/">
              My Profile{" "}
              {isUpdateRequired ? (
                <Text type="warning">(Update Required)</Text>
              ) : null}
            </Link>
          ),
          key: "0",
          icon: <Icon icon={faUser} />,
        },
        {
          label: <Link to="/u/favorites">Favorite Movies and Tv shows</Link>,
          key: "1",
          icon: <Icon icon={faHeart} />,
        },
        {
          label: "Rated Movies and TV shows",
          key: "2",
          icon: <Icon icon={faStar} />,
        },
        {
          label: "Watchlist",
          key: "3",
          icon: <Icon icon={faTicket} />,
        },
        {
          label: "Logout",
          key: "4",
          icon: <Icon icon={faSignOut} />,
          danger: true,
        },
      ]}
    />
  );
  return (
    <>
      <header className="pa-4">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={6}>
                    <NavLink to="/movies/" className={isActive}>
                      Movies
                    </NavLink>
                  </Col>
                  <Col span={6}>
                    <NavLink to="/tv-shows/" className={isActive}>
                      Tv Shows
                    </NavLink>
                  </Col>
                  <Col span={6}>
                    <NavLink to="/people/" className={isActive}>
                      People
                    </NavLink>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                {/* <ThemeTogglerComponent /> */}
                <Row className="justify-end">
                  {!isAuthenticated && (
                    <Col className="d-flex justify-end">
                      <Tooltip placement="bottom" title="Login">
                        <Link
                          to="/login/"
                          state={{
                            backgroundLocation: location,
                          }}
                        >
                          <Icon icon={faSignIn} />
                        </Link>
                      </Tooltip>
                    </Col>
                  )}
                  {isAuthenticated && (
                    <Col className="d-flex align-center">
                      {username ? (
                        <Link to={"/u/profile/"}>@{username}</Link>
                      ) : null}
                      <Dropdown.Button
                        overlay={menu}
                        placement="bottom"
                        icon={<Icon icon={faDog} />}
                      ></Dropdown.Button>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default HeaderComponent;
