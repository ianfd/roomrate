export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserLoginResponse {
    success: boolean;
    message: string;
    userInfo?: UserInfo;
}

export interface UserInfo {
    jwt: string;
    username: string;
    email: string;
}
