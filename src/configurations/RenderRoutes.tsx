import React from "react";
import { Routes, Route } from "react-router-dom";
import { MoviesView } from "src/views/MoviesView/MoviesView";
import { TvShowsView } from "src/views/TvShowsView/TvShowsView";

const routes = [];

const RenderRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/movies/" element={<MoviesView />} />
        <Route path="/tv-shows/" element={<TvShowsView />} />
      </Routes>
    </React.Fragment>
  );
};

export default RenderRoutes;
