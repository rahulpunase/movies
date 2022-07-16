import { Col, Row, Typography } from "antd";
import Icon from "../Icon/Icon";

const IconButton = ({ icon, label, disabled, ...props }: any) => {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        background: "transparent",
        border: "none",
        cursor: `${disabled ? "not-allowed" : ""}`,
        opacity: disabled ? 0.3 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <Row>
        <Col span={24} className="d-flex justify-center">
          <div
            className="d-flex justify-center align-center"
            style={{
              background: "#ffffff3a",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
          >
            {icon}
          </div>
        </Col>
        <Col span={24}>
          <Typography.Text>{label}</Typography.Text>
        </Col>
      </Row>
    </button>
  );
};

export default IconButton;
