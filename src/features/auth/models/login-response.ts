export interface LoginResponse {
  userName: string;
  role: string;
  token: string;
  refreshToken: string;
  expires: number;
}
