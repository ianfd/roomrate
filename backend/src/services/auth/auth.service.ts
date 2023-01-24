import {BadRequestException, Injectable} from "@nestjs/common";
import {UserCreateRequest} from "../../dto/usercreate.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {AccountEntity} from "../../db/account.entity";
import {Repository} from "typeorm";
import {Utils} from "../../utils";
import * as bcrypt from 'bcrypt';
import {UserLoginRequest, UserLoginResponse} from "../../dto/userLogin.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "../../dto/jwtPayload";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(AccountEntity) private repo: Repository<AccountEntity>,
                private jwtService: JwtService) {
    }

    public async existsByUsername(username: string): Promise<boolean> {
        return (await this.repo.countBy({username: username.toLowerCase()})) >= 1;
    }

    public async existsByEmail(email: string): Promise<boolean> {
        return (await this.repo.countBy({email: email.toLowerCase()})) >= 1;
    }

    public async create(create: UserCreateRequest): Promise<void> {
        if (!Utils.isEmail(create.email)) {
            throw new BadRequestException({desc: "This is not a valid email!"})
        }

        if (Utils.containsSpecialCharacters(create.username)) {
            throw new BadRequestException({desc: "This username contains special characters!"})
        }

        if (Utils.containsWhitespace(create.username)) {
            throw new BadRequestException({desc: "This username contains whitespaces."})
        }

        if (await this.existsByEmail(create.email)) {
            throw new BadRequestException({desc: "This email is already in use."})
        }

        if (await this.existsByUsername(create.username)) {
            throw new BadRequestException({desc: "This username is already in use."})
        }

        let usr = new AccountEntity();
        usr.username = create.username.toLowerCase();
        usr.email = create.email.toLowerCase();
        usr.password = await this.hashPassword(create.password);
        await this.repo.save(usr);
    }

    private async getByUsername(username: string): Promise<AccountEntity | undefined> {
        return this.repo.findOneBy({username: username.toLowerCase()})
    }

    public async login(login: UserLoginRequest): Promise<UserLoginResponse> {
        let usr = await this.getByCombination(login.username, login.password);
        if (!usr) {
            return {
                success: false,
                message: "Not found."
            };
        }

        let p: JwtPayload = {
            username: usr.username,
            email: usr.email,
            id: usr.id
        };

        let signed = await this.jwtService.signAsync(p);
        return {
            success: true,
            message: "",
            userInfo: {
                email: usr.email,
                username: usr.username,
                jwt: signed
            }
        };
    }

    public async getByJwtCombination(username: string, email: string, id: string): Promise<AccountEntity | undefined> {
        if (Utils.containsWhitespace(username) || Utils.containsSpecialCharacters(username)) {
            return undefined;
        }
        if (!Utils.isEmail(email)) {
            return undefined;
        }
        return this.repo.findOneBy({id: id, username: username, email: email});
    }

    private async getByCombination(username: string, password: string): Promise<AccountEntity | undefined> {
        if (!await this.existsByUsername(username)) {
            return undefined;
        }

        let usr = await this.getByUsername(username);
        if (!usr) {
            return undefined;
        }

        if (!await this.verify(usr.password, password)) {
            return undefined;
        }
        return usr;
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private async verify(hash: string, check: string): Promise<boolean> {
        return bcrypt.compare(check, hash);
    }
}
