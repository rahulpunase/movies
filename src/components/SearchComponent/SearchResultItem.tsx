import { Col, List, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { IMovieItem, ITVShowItem } from "src/interfaces/IMovie.interface";
import { MvImage } from "../MvImage/MvImage";
import KnownFor from "./KnownFor";

const { Text, Title, Paragraph } = Typography;

const SearchResultItem = ({
  id,
  mediaType,
  imagePath,
  originalTitle,
  releaseDate,
  overview,
  rating,
  knownFor,
}: any) => (
  <Link to={`/${mediaType}/${id}`} className="d-flex w-100">
    <Row className="w-100">
      <Col
        span={8}
        style={{
          height: mediaType === "person" ? "auto" : "178px",
        }}
      >
        <MvImage
          srcPath={imagePath}
          size="w185"
          onErrorImagePath="http://placehold.jp/185x278.png"
        />
      </Col>
      <Col
        span={16}
        style={{
          height: mediaType === "person" ? "auto" : "178px",
        }}
      >
        <div className="ml-4 pt-2">
          <Title level={4}>{originalTitle}</Title>
          {releaseDate && <Text type="secondary">{releaseDate}</Text>}
          {overview && <Paragraph>{overview}</Paragraph>}
          {rating && <Text>{rating}</Text>}
          {mediaType === "person" ? (
            <>
              <Text className="mb-2">Known for: </Text>
              <List
                grid={{ gutter: 1, column: 3 }}
                dataSource={knownFor as Array<IMovieItem & ITVShowItem>}
                renderItem={(knownFor) => (
                  <List.Item>
                    {
                      {
                        movie: (
                          <KnownFor
                            name={knownFor.original_title}
                            mediaType={knownFor.media_type}
                            id={knownFor.id}
                            imagePath={knownFor.poster_path}
                          />
                        ),
                        tv: (
                          <KnownFor
                            name={knownFor.original_name}
                            mediaType={knownFor.media_type}
                            id={knownFor.id}
                            imagePath={knownFor.poster_path}
                          />
                        ),
                      }[knownFor.media_type || ""]
                    }
                  </List.Item>
                )}
              />
            </>
          ) : null}
        </div>
      </Col>
    </Row>
  </Link>
);

export default SearchResultItem;
