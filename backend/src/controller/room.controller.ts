import {BadRequestException, Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {RoomService} from "../services/room.service";
import {AuthGuard} from "@nestjs/passport";
import {RoomDto} from "../dto/room.dto";
import {RoomCreateRequest} from "../dto/roomCreate.dto";

@Controller("room")
export class RoomController {

    constructor(private room: RoomService) {
    }

    @Get("all")
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Query("limit") limit: number, @Query("page") page: number): Promise<RoomDto[]> {
        if (limit <= 0 && page <= 0) throw new BadRequestException();
        return this.room.getAll(limit, page);
    }

    @Get("count")
    @UseGuards(AuthGuard('jwt'))
    async getCount(): Promise<number> {
        return this.room.countAll();
    }

    @Get("all/building")
    @UseGuards(AuthGuard('jwt'))
    async getAllByBuilding(@Query("limit") limit: number, @Query("page") page: number, @Query("id") id: string): Promise<RoomDto[]> {
        if (limit <= 0 || page <= 0 || !id) throw new BadRequestException();
        return this.room.getByBuilding(id, limit, page);
    }

    @Get("count/building")
    @UseGuards(AuthGuard('jwt'))
    async getCountByBuilding(@Query("id") id: string): Promise<number> {
        if (!id) throw new BadRequestException();
        return this.room.countByBuilding(id);
    }

    @Post("create")
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() req: RoomCreateRequest): Promise<void> {
        return this.room.create(req);
    }

    @Get("delete")
    @UseGuards(AuthGuard("jwt"))
    async delete(@Query("id") id: string): Promise<void> {
        if (!id) {
            throw new BadRequestException();
        }
        await this.room.delete(id);
    }

}
