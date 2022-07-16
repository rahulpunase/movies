import { useContext, useEffect } from "react";
import { CustomThemecontext } from "./theme/themeContext";
import { ParentBodyComponent } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfiguration } from "./redux/ducks/configuration.slice";
import { AppDispatch, TRootState } from "./redux/store";
import Progress from "./components/Progress/Progress";
import { supabase } from "./services/instance/supabase.instance";
import {
  fetchFavorites,
  fetchProfile,
  fetchWatchlist,
  logoutUser,
  setSession,
} from "./redux/ducks/profile.slice";
import { Session } from "@supabase/supabase-js";

const themes = ["dark", "light"];

function App() {
  const { theme } = useContext(CustomThemecontext);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(
    (store: TRootState) => store.configureReducer
  );

  const onLoadAndSync = (session: Session | null) => {
    if (session) {
      dispatch(setSession(session));
      dispatch(fetchProfile({}));
      dispatch(fetchFavorites({}));
      dispatch(fetchWatchlist({}));
    } else {
      dispatch(logoutUser());
    }
  };

  useEffect(() => {
    const session = supabase.auth.session();
    onLoadAndSync(session);

    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      onLoadAndSync(session);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchConfiguration());
  }, [dispatch]);

  useEffect(() => {
    themes.forEach((theme) => document.body.classList.remove(theme));
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <>
      <Progress isAnimating={isLoading} />
      <ParentBodyComponent />
    </>
  );
}

export default App;
