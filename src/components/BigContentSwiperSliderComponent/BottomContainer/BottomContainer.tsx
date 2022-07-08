import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Typography } from "antd";
import classNames from "classnames";
import { FC, useState } from "react";
import styles from "./BottomContainer.module.scss";
import { Rate } from "antd";

interface IBottomContainer {
  name: string;
  rating: number;
  overview: string;
}

const { Title, Text, Paragraph } = Typography;

export const BottomContainer: FC<IBottomContainer> = ({
  name,
  rating,
  overview,
}) => {
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
        className={classNames(
          `${styles.iconHolder} d-flex justify-center custom-cursor-pointer`,
          {
            "mb-5": !isOpen,
          }
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon
          icon={isOpen ? faChevronDown : faChevronUp}
          color="white"
        />
      </Col>
      <Col span={24}>
        <Title level={4}>{name}</Title>
      </Col>
      <Col span={24}>
        <Row className="justify-space-between align-center">
          <Col>
            <div>
              <Rate disabled defaultValue={rating / 2} />
              <Text className="ml-2">{rating / 2}</Text>
            </div>
          </Col>
          <Col>2022</Col>
        </Row>
      </Col>
      <Col span={24}>
        <Paragraph>{overview}</Paragraph>
      </Col>
    </Row>
  );
};
