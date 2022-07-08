import { List, Tabs } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RenderSmoothly } from "src/components";
import { IMovieItem, ITVShowItem } from "src/interfaces/IMovie.interface";
import { TRootState } from "src/redux/store";
import FavoriteItem from "./FavoriteItem";

const FavoritesTab = () => {
  const {
    favorites: { results, isFavLoading },
  } = useSelector((store: TRootState) => store.profilereducer);
  const [defaultTab, setDefaultTab] = useState("movie");
  const movies = [...results].filter((item) => item.media_type === "movie");
  const tvShows = [...results].filter((item) => item.media_type === "tv");
  const onTabChange = (key: string) => {
    setDefaultTab(key);
  };

  return (
    <RenderSmoothly>
      <Tabs defaultActiveKey={defaultTab} onChange={onTabChange}>
        <Tabs.TabPane tab="Movies" key="movie">
          <List
            grid={{ gutter: 0, column: 2 }}
            dataSource={movies}
            renderItem={(item) => {
              const toRender = JSON.parse(item.item_json) as IMovieItem;
              return (
                <List.Item>
                  <FavoriteItem
                    id={toRender.id}
                    name={toRender.original_title}
                    posterPath={toRender.poster_path}
                  />
                </List.Item>
              );
            }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tv Shows" key="tv">
          <List
            grid={{ gutter: 0, column: 2 }}
            dataSource={tvShows}
            renderItem={(item) => {
              const toRender = JSON.parse(item.item_json) as ITVShowItem;
              return (
                <List.Item>
                  <FavoriteItem
                    id={toRender.id}
                    name={toRender.name}
                    posterPath={toRender.poster_path}
                  />
                </List.Item>
              );
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </RenderSmoothly>
  );
};

export default FavoritesTab;
