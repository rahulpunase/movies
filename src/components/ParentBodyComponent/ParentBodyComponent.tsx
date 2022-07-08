import { useLayoutEffect, useRef } from "react";
import { Col, Row, Layout } from "antd";
import RenderRoutes from "src/configurations/RenderRoutes";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import RightSideBarComponent from "../RightSideBarComponent/RightSideBarComponent";
import SideMenuComponent from "../SideMenuComponent/SideMenuComponent";
import styles from "../../App.module.scss";

const { Content } = Layout;

const ParentBodyComponent = () => {
  const leftFixedPanelParent = useRef<HTMLDivElement>(null);
  const leftFixedPanel = useRef<HTMLDivElement>(null);
  const rightFixedPanelParent = useRef<HTMLDivElement>(null);
  const rightFixedPanel = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (leftFixedPanelParent?.current && leftFixedPanel?.current) {
      leftFixedPanel.current.style.width = String(
        leftFixedPanelParent.current.offsetWidth + "px"
      );
    }
    if (rightFixedPanelParent?.current && rightFixedPanel?.current) {
      rightFixedPanel.current.style.width = String(
        rightFixedPanelParent.current.offsetWidth + "px"
      );
    }
  }, []);
  return (
    <div className={`${styles.App}`}>
      <main className={styles.mainContainer}>
        <Row className="h-100">
          {/* <Col
            span={4}
            style={{ position: "relative" }}
            ref={leftFixedPanelParent}
            className="theme-primary-background"
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
          </Col> */}
          <Col span={24} className="theme-secondary-background">
            <Content>
              {/* <HeaderComponent /> */}
              <RenderRoutes />
            </Content>
          </Col>
          {/* <Col
            span={5}
            style={{ position: "relative" }}
            ref={rightFixedPanelParent}
            className="theme-primary-background"
          >
            <div
              ref={rightFixedPanel}
              style={{
                position: "fixed",
              }}
            >
              <RightSideBarComponent />
            </div>
          </Col> */}
        </Row>
      </main>
    </div>
  );
};

export default ParentBodyComponent;
