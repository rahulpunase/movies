import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { loaded, loading } from "src/redux/ducks/configuration.slice";
import { createClient } from "@supabase/supabase-js";

const base_URL = process.env.REACT_APP_SUPABASE_URL as string;
const API_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

const instance: AxiosInstance = axios.create({
  baseURL: base_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export const setUpSupaInterceptor = (store: any) => {
  const handleError = async (error: AxiosError) => {
    console.log("from supa", error);
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

export const getSupaRequest = <T>(url: string, params: object): Promise<T> => {
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

export const postSupaRequest = <T>(
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

export const supabase = createClient(base_URL, API_KEY);
