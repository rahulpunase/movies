import { Col, Row, Typography, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { TRootState } from "src/redux/store";
import GenreComponent from "../GenreComponent/GenreComponent";

const { Title } = Typography;

const FlexContainer = (props: any) => (
  <div className="d-flex flex-wrap" {...props} />
);

const SearchFromGenreComponent = () => {
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const { isGenreLoading, movieGenres, tvGenres } = useSelector(
    (store: TRootState) => store.contentReducer
  );

  return (
    <Row>
      <Col span={24}>
        <Title level={4}>Search from Genres</Title>
      </Col>
      <Col span={24}>
        {isGenreLoading ? (
          <Skeleton />
        ) : (
          <>
            <Routes location={state?.backgroundLocation || location}>
              <Route
                path="/movies/"
                element={
                  <FlexContainer>
                    {movieGenres.map((genre) => (
                      <GenreComponent
                        key={genre.id}
                        name={genre.name}
                        id={genre.id}
                        type="movie"
                      />
                    ))}
                  </FlexContainer>
                }
              />
              <Route
                path="/tv-shows/"
                element={
                  <FlexContainer>
                    {tvGenres.map((genre) => (
                      <GenreComponent
                        key={genre.id}
                        name={genre.name}
                        id={genre.id}
                        type="tv"
                      />
                    ))}
                  </FlexContainer>
                }
              />
            </Routes>
          </>
        )}
      </Col>
    </Row>
  );
};

export default SearchFromGenreComponent;
