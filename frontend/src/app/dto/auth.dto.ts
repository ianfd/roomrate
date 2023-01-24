export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  userInfo?: UserInfo;
}

export interface UserInfo {
  jwt: string;
  username: string;
  email: string;
}

export interface UserCreateRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserDataDto {
  username: string;
  email: string;
}
