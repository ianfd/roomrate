import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "../services/auth/auth.service";
import {UserCreateRequest} from "../dto/usercreate.dto";
import {AuthGuard} from "@nestjs/passport";
import {UserLoginRequest, UserLoginResponse} from "../dto/userLogin.dto";

@Controller("auth")
export class AuthController {

    constructor(private auth: AuthService) {
    }

    @Post("create")
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() req: UserCreateRequest): Promise<void> {
        return this.auth.create(req);
    }

    @Post("login")
    async login(@Body() req: UserLoginRequest): Promise<UserLoginResponse> {
        return this.auth.login(req);
    }
}
