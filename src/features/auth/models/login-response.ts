export interface LoginResponse {
  username: string;
  role: string;
  token: string;
  refreshToken: string;
  expires: number;
}
