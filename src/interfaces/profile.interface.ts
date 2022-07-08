export interface IRequstTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface ISessionResponse {
  success: boolean;
  session_id: string;
}

export interface IAccountDetailsResponse {
  avatar: object;
  id: number;
  name: string;
  username: string;
}

export interface ILoginRequstResponse {
  avatar: object;
  id: number;
  name: string;
  username: string;
  sessionId: string;
}
