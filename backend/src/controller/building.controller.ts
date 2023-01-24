import {BadRequestException, Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {BuildingService} from "../services/building.service";
import {BuildingDto} from "../dto/building.dto";
import {AuthGuard} from "@nestjs/passport";
import {BuildingCreateRequest} from "../dto/buildingCreate.dto";

@Controller("building")
export class BuildingController {

    constructor(private building: BuildingService) {
    }

    @Get("all")
    @UseGuards(AuthGuard('jwt'))
    async getAll(): Promise<BuildingDto[]> {
        return this.building.getAll();
    }

    @Get("get/faculty")
    @UseGuards(AuthGuard('jwt'))
    async getByFaculty(@Query("faculty") id: string): Promise<BuildingDto[]> {
        if (!id) throw new BadRequestException();
        return this.building.getByFaculty(id);
    }

    @Get("get/id")
    @UseGuards(AuthGuard('jwt'))
    async getById(@Query("id") id: string): Promise<BuildingDto> {
        if (!id) throw new BadRequestException();
        return this.building.getById(id);
    }

    @Post("create")
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() req: BuildingCreateRequest): Promise<void> {
        return this.building.create(req);
    }

    @Get("delete")
    @UseGuards(AuthGuard('jwt'))
    async delete(@Query("id") id: string): Promise<void> {
        if (!id) throw new BadRequestException();
        return this.building.delete(id);
    }


}
