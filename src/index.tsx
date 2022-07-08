import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd-css-utilities/utility.min.css";
import "./index.scss";
import { ThemeContextProvider } from "./theme/themeContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "antd/dist/antd.variable.min.css";
import { setUpInterceptor } from "./services/instance/movie.instance";
import { setUpSupaInterceptor } from "./services/instance/supabase.instance";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

setUpInterceptor(store);
setUpSupaInterceptor(store);

root.render(
  <ThemeContextProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
