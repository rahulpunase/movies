import Axios from "axios";

const base_URL = "https://api.themoviedb.org/3";
const API_KEY = "d61b3b53a6dbef628282cd7dc88cd08b";

export const getRequest = <T>(url: string, params: object): Promise<T> => {
  // store.dispatch(loading());
  return Axios.get(`${base_URL}${url}`, {
    params: {
      ...params,
      api_key: API_KEY,
    },
  }).then((response) => {
    // store.dispatch(loaded());
    return response.data;
  });
};

export const postRequest = () => {};
