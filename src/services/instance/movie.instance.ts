import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { loaded, loading } from "src/redux/ducks/configuration.slice";
const base_URL = process.env.REACT_APP_MOVIE_BASE_URL;
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

const instance: AxiosInstance = axios.create({
  baseURL: base_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export const setUpInterceptor = (store: any) => {
  const handleError = async (error: AxiosError) => {
    store.dispatch(loaded());
    return Promise.reject(error);
  };

  instance.interceptors.request.use(
    async (config: any | AxiosRequestConfig) => {
      /* your logic here */
      store.dispatch(loading());
      return config;
    }
  );

  instance.interceptors.response.use((response) => {
    store.dispatch(loaded());
    return response;
  }, handleError);
};

export const getRequest = <T>(url: string, params: object): Promise<T> => {
  return instance
    .get(`${base_URL}${url}`, {
      params: {
        ...params,
        api_key: API_KEY,
      },
    })
    .then((response) => {
      // store.dispatch(loaded());
      return response.data;
    });
};

export const postRequest = <T>(
  url: string,
  params: object,
  payload: object
): Promise<T> => {
  return instance
    .post(`${base_URL}${url}`, payload, {
      params: {
        ...params,
        api_key: API_KEY,
      },
    })
    .then((response) => response.data);
};
