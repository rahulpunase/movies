import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Typography } from "antd";
import classNames from "classnames";
import { useState } from "react";
import styles from "./BottomContainer.module.scss";

const { Title } = Typography;

export const BottomContainer = (props: any) => {
  const { name } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Row
      className={classNames(
        `${styles.BottomContainer} theme-primary-background-op pa-2 align-content-start`,
        { [styles.open]: isOpen }
      )}
    >
      <Col
        span={24}
        className={`${styles.iconHolder} d-flex justify-center custom-cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faChevronUp} color="white" />
      </Col>
      <Col span={24}>
        <Title level={4}>{name}</Title>
      </Col>
    </Row>
  );
};
