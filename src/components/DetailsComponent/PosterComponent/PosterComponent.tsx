import { FC } from "react";
import { Col, Row, Image } from "antd";
import { MvImage } from "src/components/MvImage/MvImage";
import { Typography, Rate } from "antd";
import GenreComponent from "src/components/GenreComponent/GenreComponent";
import { Crew, IGenre } from "src/interfaces/IMovie.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import imdb_logo from "src/assets/images/imdb_logo.png";
import { Link } from "react-router-dom";
import { Icon } from "src/lib";
import RenderSmoothly from "src/components/RenderSmoothly/RenderSmoothly";

const { Text, Title, Paragraph } = Typography;

interface IPosterComponent {
  type: "movie" | "tv";
  imgPath: string;
  title: string;
  tagLine: string;
  genres: Array<IGenre>;
  overview: string;
  releaseDate?: string;
  runTime?: number;
  rating: number;
  imdbId?: string;
  homepage: string;
  director: Crew | undefined;
  producers: Array<Crew>;
}

const PosterComponent: FC<IPosterComponent> = ({
  imgPath,
  title,
  tagLine,
  genres,
  overview,
  releaseDate,
  runTime,
  rating,
  imdbId,
  homepage,
  director,
  producers,
  type,
}) => {
  return (
    <RenderSmoothly>
      <Row>
        <Col span={9}>
          <MvImage srcPath={imgPath} size="w600_and_h900_bestv2" />
        </Col>
        <Col span={15}>
          <Row className="pa-4">
            <Col span={24} className="mb-3">
              <Title level={2}>
                {title} {releaseDate && `(${releaseDate.split("-")[0]})`}
              </Title>
              <Text>{tagLine}</Text>
            </Col>
            <Col span={24} className="d-flex mb-3">
              {genres.map((genre) => (
                <GenreComponent name={genre.name} id={genre.id} type={type} />
              ))}
            </Col>
            <Col span={24} className="mb-1">
              <Paragraph>{overview}</Paragraph>
            </Col>
            {director && (
              <Col span={24} className="mb-1">
                <Text>Director: </Text>
                <Link to={`/people/${director.id}`}>{director.name}</Link>
              </Col>
            )}
            {producers.length ? (
              <Col span={24} className="mb-1">
                <Text>Producer: </Text>
                <span>
                  {producers.map((producer, index) => (
                    <>
                      <Link key={producer.id} to={`/people/${producer.id}`}>
                        {producer.name}
                      </Link>{" "}
                      {index !== producers.length - 1 && ", "}
                    </>
                  ))}
                </span>
              </Col>
            ) : null}
            {runTime && (
              <Col span={24} className="mb-1">
                <Text>
                  {releaseDate} | {runTime}m
                </Text>
              </Col>
            )}
            <Col span={24} className="d-flex mb-1" title={String(rating)}>
              <Rate disabled defaultValue={rating / 2} />
            </Col>
            <Col span={24} title="Budget" className="mb-1">
              <div>
                <Icon icon={faMoneyBill} />
                &nbsp;
                <Text strong>Budget: </Text>
              </div>

              <Text>$20, 234, 234</Text>
            </Col>
            <Col span={24} title="Box office collection" className="mb-1">
              <div>
                <Icon icon={faSackDollar} />
                &nbsp;
                <Text strong>Box Office Collection: </Text>
              </div>
              <Text>$40, 534, 834</Text>
            </Col>
            <Col span={24} className="mb-1">
              <a
                target="_blank"
                href={`https://www.imdb.com/title/${imdbId}/`}
                rel="noreferrer"
              >
                <Image src={imdb_logo} preview={false} width={30} />
              </a>
            </Col>
            <Col span={24} className="mb-1">
              <Text strong>Official Home Page: </Text>
              <a target="_blank" href={homepage} rel="noreferrer">
                {homepage}
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </RenderSmoothly>
  );
};

export default PosterComponent;
