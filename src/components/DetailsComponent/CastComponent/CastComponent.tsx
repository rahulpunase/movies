import { FC } from "react";
import { Card, Col, Row, Typography } from "antd";
import { ICast } from "src/interfaces/IMovie.interface";
import { MvImage } from "src/components/MvImage/MvImage";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

interface ICastComponent {
  cast: Array<ICast>;
}

const CastComponent: FC<ICastComponent> = ({ cast }) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className="custom-side-line" level={2}>
            Cast
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="d-flex flex-wrap">
          {cast
            .filter((c, i) => i < 15)
            .map((castChar, indKey) => (
              <Link
                to={`/people/${castChar.id}`}
                className="d-flex"
                style={{ width: `${100 / 5}%` }}
                key={indKey}
              >
                <Row className="ma-1 theme-primary-background br-2 overflow-hidden">
                  <Col span={24}>
                    <MvImage
                      srcPath={castChar.profile_path}
                      size="w185"
                      onErrorImagePath="http://placehold.jp/185x278.png"
                    />
                  </Col>
                  <Col span={24} className="pa-2">
                    <div>
                      <Text strong>{castChar.name}</Text>
                      <div>
                        <Text type="secondary">{castChar.character}</Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Link>
            ))}
        </Col>
      </Row>
      <Row>
        <Col span={24} className="mt-2">
          <Link to={`cast`}>See all cast</Link>
        </Col>
      </Row>
    </>
  );
};

export default CastComponent;
