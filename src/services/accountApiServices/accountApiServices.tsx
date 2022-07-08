import { ILoginRequstResponse } from "src/interfaces/profile.interface";
import { getRequest, postRequest } from "../instance/movie.instance";

const AccountApiServices = {
  getAccountDetails: <T extends unknown>(sessionId: string) =>
    getRequest<T>("/account", {
      session_id: sessionId,
    }),

  getRequestToken: <T extends unknown>() =>
    getRequest<T>("/authentication/token/new", {}),

  authenticateRequestToken: <T extends unknown>(
    username: string,
    password: string
  ) =>
    postRequest<T>(
      "/authentication/token/validate_with_login",
      {},
      {
        username,
        password,
        request_token: localStorage.getItem("request_token"),
      }
    ),
  createSession: <T extends unknown>() =>
    postRequest<T>(
      "/authentication/session/new",
      {},
      {
        request_token: localStorage.getItem("request_token"),
      }
    ),
};
// const foo = <T extends unknown>(x: T) => x;

export default AccountApiServices;
