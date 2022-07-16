import { Col, Row, Skeleton } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  LoadingViewComponent,
  MultiVideoPlayerComponent,
} from "src/components";
import {
  CastComponent,
  PosterComponent,
} from "src/components/DetailsComponent";
import {
  fetchTVShowDetailsFromId,
  fetchCastandCrewForTVFromId,
} from "src/redux/ducks/tvShowDetails.slice";
import { AppDispatch, TRootState } from "src/redux/store";
import utils from "src/utils/utils";

const TVShowDetailsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { tvShowDetails, cast, crew } = useSelector(
    (store: TRootState) => store.tvShowDetailsReducer
  );
  const {
    poster_path,
    original_name,
    tagline,
    genres,
    overview,
    vote_average,
    homepage,
  } = tvShowDetails;

  const director = utils.getDirectorFromCrew(crew);
  const producers = utils.getProducersFromCew(crew);

  useEffect(() => {
    dispatch(fetchTVShowDetailsFromId({ id: id as string }));
    dispatch(fetchCastandCrewForTVFromId({ id: id as string }));
  }, [id, dispatch]);
  return (
    <Row className="mt-10">
      <Col span={24}>
        {tvShowDetails.isLoading ? (
          <LoadingViewComponent />
        ) : (
          <>
            <PosterComponent
              type="tv"
              imgPath={poster_path}
              title={original_name}
              tagLine={tagline}
              genres={genres}
              overview={overview}
              releaseDate=""
              rating={vote_average}
              imdbId={""}
              homepage={homepage}
              director={director}
              producers={producers}
            />
            <div className="mb-4"></div>
            <Col span={24}>
              <MultiVideoPlayerComponent
                videos={tvShowDetails.videos.results}
              />
            </Col>
            <div className="mb-4"></div>
            <CastComponent cast={cast.results} />
          </>
        )}
      </Col>
    </Row>
  );
};

export default TVShowDetailsView;
