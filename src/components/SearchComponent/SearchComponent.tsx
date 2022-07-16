import { Col, Row, Input, Typography, List } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "src/lib";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, TRootState } from "src/redux/store";
import { ChangeEvent, useCallback } from "react";
import {
  setQuery,
  fetchResultFromQuery,
  resetSearchData,
} from "src/redux/ducks/search.slice";
import { debounce } from "lodash";
import SearchResultItem from "./SearchResultItem";

const { Text } = Typography;

interface ISearchComponent {
  activeClickNavigate?: boolean;
}

const SearchComponent: React.FC<ISearchComponent> = ({
  activeClickNavigate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, results, query } = useSelector(
    (store: TRootState) => store.searchReducer
  );

  const handleDebounceFn = (query: string) => {
    dispatch(
      fetchResultFromQuery({
        query: query,
        page: 1,
      })
    );
  };

  const debounceFunc = useCallback(debounce(handleDebounceFn, 600), []);

  const openSearchModal = () =>
    navigate("/search/", {
      state: { backgroundLocation: location },
      replace: true,
    });

  const queryData = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    dispatch(setQuery(query));
    if (!query) {
      dispatch(resetSearchData());
      return;
    }
    debounceFunc(event.target.value);
  };
  return (
    <Row onClick={() => (activeClickNavigate ? openSearchModal() : {})}>
      <Col span={24}>
        {activeClickNavigate && (
          <Row className="pa-3 theme-secondary-background br-3">
            <Col>
              <Icon icon={faSearch}></Icon>
            </Col>
            <Col className="ml-4">
              <Text>Search</Text>
            </Col>
          </Row>
        )}
        {!activeClickNavigate && (
          <>
            <Row className="d-flex mb-3">
              <Col span={2} className="d-flex justify-center flex-column">
                <Icon icon={faSearch} size={"1x"} />
              </Col>
              <Col span={22}>
                <Input
                  value={query}
                  onChange={(event) => queryData(event)}
                  placeholder="Search movies, tv-shows and people..."
                />
              </Col>
            </Row>
            {isLoading && <Text>Loading...</Text>}
            <Row>
              <Col span={24}>
                <List
                  dataSource={results}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      {
                        {
                          movie: (
                            <SearchResultItem
                              id={item.id}
                              originalTitle={item.original_title}
                              releaseDate={item.release_date}
                              imagePath={item.poster_path}
                              overview={item.overview}
                              rating={item.vote_average}
                              mediaType={item.media_type}
                            />
                          ),
                          tv: (
                            <SearchResultItem
                              id={item.id}
                              originalTitle={item.original_name}
                              imagePath={item.poster_path}
                              overview={item.overview}
                              rating={item.vote_average}
                              mediaType={item.media_type}
                            />
                          ),
                          person: (
                            <SearchResultItem
                              id={item.id}
                              originalTitle={item.name}
                              imagePath={item.profile_path}
                              rating={item.vote_average}
                              mediaType={item.media_type}
                              knownFor={item.known_for}
                            />
                          ),
                        }[item.media_type || ""]
                      }
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default SearchComponent;
