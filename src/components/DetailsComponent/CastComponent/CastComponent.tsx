import { FC } from "react";
import { Card, Col, List, Row, Typography } from "antd";
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
          <Title className="custom-side-line" level={3}>
            Cast
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="d-flex flex-wrap">
          <List
            grid={{
              xs: 3,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={cast.filter((c, i) => i < 10)}
            renderItem={({ profile_path, id, name, character }: any) => (
              <List.Item>
                <Link to={`/people/${id}`}>
                  <Row className="theme-primary-background br-2 overflow-hidden">
                    <Col span={24}>
                      <MvImage
                        srcPath={profile_path}
                        size="w185"
                        onErrorImagePath="http://placehold.jp/185x278.png"
                      />
                    </Col>
                    <Col span={24} className="pa-2">
                      <div>
                        <Text strong>{name}</Text>
                        <div>
                          <Text type="secondary">{character}</Text>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </List.Item>
            )}
          />
          ))
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
