import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { TRootState } from "src/redux/store";
import {
  DiscoverView,
  LoginView,
  MovieDetailsView,
  MoviesView,
  PeopleView,
  ProfileBodyView,
  SearchView,
  TVShowDetailsView,
  TvShowsView,
} from "src/views";

import MovieViewResponsive from "src/responsive/views/movies.view";

const RenderRoutes = () => {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const { session } = useSelector((store: TRootState) => store.profilereducer);

  return (
    <React.Fragment>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Navigate to="/movies/" replace />} />
        <Route path="/movies/" element={<MoviesView />} />
        <Route path="/tv-shows/" element={<TvShowsView />} />
        <Route path="/discover/:type/" element={<DiscoverView />} />
        <Route path="/movie/:id/" element={<MovieDetailsView />} />
        <Route path="/tv/:id/" element={<TVShowDetailsView />} />
        <Route path="/people/:id/" element={<PeopleView />} />
        <Route path="/u/*" element={<ProfileBodyView />} />
        <Route path="*" element={<Navigate to="/movies/" replace />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/search/" element={<SearchView />} />
          {!session ? (
            <Route path="/login/" element={<LoginView />} />
          ) : (
            <Route path="/login" element={<Navigate to="/movies/" replace />} />
          )}
        </Routes>
      )}
      {/* <Routes>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes> */}
    </React.Fragment>
  );
};

export default RenderRoutes;
