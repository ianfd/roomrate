export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    jwt?: string;
    username?: string;
    email?: string;
}
