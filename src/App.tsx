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
  logoutUser,
  setSession,
} from "./redux/ducks/profile.slice";

const themes = ["dark", "light"];

function App() {
  const { theme } = useContext(CustomThemecontext);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(
    (store: TRootState) => store.configureReducer
  );

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      dispatch(setSession(session));
      dispatch(fetchProfile({}));
      dispatch(fetchFavorites({}));
    } else {
      dispatch(logoutUser());
    }

    supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session) {
        dispatch(setSession(session));
        dispatch(fetchProfile({}));
      }
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
