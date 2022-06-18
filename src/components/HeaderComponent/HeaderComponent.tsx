import { Col, Divider, Row, Typography } from "antd";
import React, { useContext } from "react";
import { CustomThemecontext } from "src/theme/themeContext";
import { NavLink } from "react-router-dom";
import { ThemeTogglerComponent } from "src/components";

const HeaderComponent = () => {
  const isActive = ({ isActive }: any) =>
    `custom-links ${isActive ? "active" : ""}`;
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
                <ThemeTogglerComponent />
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default HeaderComponent;
