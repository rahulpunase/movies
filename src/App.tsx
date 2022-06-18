import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Col, Divider, Layout, Row } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import { CustomThemecontext } from "./theme/themeContext";
import { HeaderComponent, SideMenuComponent } from "./components";
import RenderRoutes from "./configurations/RenderRoutes";
import styles from "./App.module.scss";
import { useDispatch } from "react-redux";
import { fetchConfiguration } from "./redux/ducks/configuration.slice";
import { AppDispatch } from "./redux/store";

function App() {
  const { theme, getColors } = useContext(CustomThemecontext);
  const dispatch = useDispatch<AppDispatch>();
  const leftFixedPanelParent = useRef<HTMLDivElement>(null);
  const leftFixedPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(fetchConfiguration());
  }, [dispatch]);
  useLayoutEffect(() => {
    if (leftFixedPanelParent?.current && leftFixedPanel?.current) {
      leftFixedPanel.current.style.width = String(
        leftFixedPanelParent.current.offsetWidth + "px"
      );
    }
  }, []);
  return (
    <div className={`${styles.App} ${theme}`}>
      <main className={styles.mainContainer}>
        <Row className="theme-primary-background">
          <Col
            span={4}
            style={{ position: "relative" }}
            ref={leftFixedPanelParent}
          >
            <div
              ref={leftFixedPanel}
              style={{
                position: "fixed",
              }}
            >
              <div style={{ height: "54px" }}></div>
              <SideMenuComponent />
            </div>
          </Col>
          <Col span={15} className="theme-secondary-background">
            <div>
              <Content>
                <HeaderComponent />
                <RenderRoutes />
              </Content>
            </div>
          </Col>
          <Col span={5}></Col>
        </Row>
      </main>
    </div>
  );
}

export default App;
