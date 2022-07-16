import { Col, Drawer, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { Icon } from "src/lib";
import {
  faBars,
  faTimes,
  faSearch,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import SideMenuComponent from "../SideMenuComponent/SideMenuComponent";
import { Transition, config, animated } from "react-spring";
import routeTitle from "src/configurations/routeTitle.data.json";
import { TransitionSmoothly } from "../TransitionSmoothly/TransitionSmoothly";

const { Text } = Typography;

const HeaderComponent = () => {
  const isActive = ({ isActive }: any) =>
    `custom-links ${isActive ? "active" : ""}`;
  const location = useLocation();
  const navigate = useNavigate();
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  const [scrTop, setScrTop] = useState(0);
  const [toggle, setToggle] = useState(false);

  const [pageTitle, setPageTitle] = useState("");

  const onScroll = (ev: any) => {
    setScrTop(ev.target.documentElement.scrollTop);
  };

  useEffect(() => {
    setOpenSideDrawer(false);
    setToggle(!["/movies/", "/tv-shows/"].includes(location.pathname));
    const routeTitlee = routeTitle as any;
    const keys = Object.keys(routeTitle);

    for (const key of keys) {
      if (location.pathname.includes(key)) {
        setPageTitle(routeTitlee[key]);
        break;
      }
    }
  }, [location]);

  useEffect(() => {
    window.document.addEventListener("scroll", onScroll);
    return () => {
      window.document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className="pa-4 position-fixed w-100"
        style={{
          zIndex: "2",
          background: `rgba(14, 12, 16, ${scrTop / 100})`,
        }}
      >
        <Row>
          <Col span={24}>
            <Row>
              <Col
                span={2}
                onClick={() =>
                  toggle ? navigate(-1) : setOpenSideDrawer(!openSideDrawer)
                }
              >
                <TransitionSmoothly
                  toggleCondition={toggle}
                  elementOne={<Icon icon={faAngleLeft} />}
                  elementTwo={<Icon icon={faBars} />}
                />
              </Col>
              <Col span={19}>
                {!pageTitle && (
                  <Row>
                    <Col className="mr-4">
                      <NavLink to="/movies/" className={isActive}>
                        Movies
                      </NavLink>
                    </Col>
                    <Col className="mr-4">
                      <NavLink to="/tv-shows/" className={isActive}>
                        Tv Shows
                      </NavLink>
                    </Col>
                    <Col className="mr-4">
                      <NavLink to="/people/" className={isActive}>
                        People
                      </NavLink>
                    </Col>
                  </Row>
                )}
                {pageTitle && <Text>{pageTitle}</Text>}
              </Col>
              <Col span={3} className="d-flex justify-end align-center">
                <Link to="/search/" state={{ backgroundLocation: location }}>
                  <Icon icon={faSearch}></Icon>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
      <Drawer
        placement={"left"}
        closable={false}
        onClose={() => setOpenSideDrawer(false)}
        visible={openSideDrawer}
        key={""}
        zIndex={3}
        className="side_menu_com"
      >
        <Row className="pa-4">
          <Col
            className="mb-4"
            span={24}
            onClick={() => setOpenSideDrawer(false)}
          >
            <Icon icon={faTimes} />
          </Col>
          <Col span={24}>
            <SideMenuComponent />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default HeaderComponent;
