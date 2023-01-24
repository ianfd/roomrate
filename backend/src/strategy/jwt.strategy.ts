import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "../services/auth/auth.service";
import {JwtPayload} from "../dto/jwtPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader("auth"),
            secretOrKey: process.env.JWT_SECRET,
            ignoreExpiration: false
        });
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        let usr = await this.authService.getByJwtCombination(payload.username, payload.email, payload.id);
        if (!usr) {
            throw new UnauthorizedException();
        }
        return {id: usr.id, username: usr.username, email: usr.email};
    }

}
