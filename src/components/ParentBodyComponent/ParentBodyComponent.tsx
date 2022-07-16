import { useLayoutEffect, useRef } from "react";
import { Col, Row, Layout } from "antd";
import RenderRoutes from "src/configurations/RenderRoutes";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import styles from "../../App.module.scss";
import { BottomNavigationComponent } from "src/components";
import { useSelector } from "react-redux";
import { TRootState } from "src/redux/store";

const { Content } = Layout;

const ParentBodyComponent = () => {
  const leftFixedPanelParent = useRef<HTMLDivElement>(null);
  const leftFixedPanel = useRef<HTMLDivElement>(null);
  const rightFixedPanelParent = useRef<HTMLDivElement>(null);
  const rightFixedPanel = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useSelector(
    (store: TRootState) => store.profilereducer
  );
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
        <Row className="pb-15">
          <Col span={24}>
            <HeaderComponent />
            <Content>
              <RenderRoutes />
            </Content>
          </Col>
        </Row>
        <div
          style={{
            width: "100%",
            bottom: 0,
            zIndex: 1,
          }}
          className="position-fixed"
        >
          {isAuthenticated && <BottomNavigationComponent />}
        </div>
      </main>
    </div>
  );
};

export default ParentBodyComponent;
