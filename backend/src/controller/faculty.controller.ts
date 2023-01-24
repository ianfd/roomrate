import {BadRequestException, Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {FacultyService} from "../services/faculty.service";
import {FacultyDto} from "../dto/faculty.dto";
import {AuthGuard} from "@nestjs/passport";
import {FacultyCreateDto} from "../dto/facultyCreate.dto";
import {FacultyEditDto} from "../dto/facultyEdit.dto";

@Controller("faculty")
export class FacultyController {

    constructor(private facultyService: FacultyService) {
    }

    @Get("all")
    @UseGuards(AuthGuard('jwt'))
    async getAll(): Promise<FacultyDto[]> {
        return this.facultyService.getAll();
    }

    @Post("create")
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() req: FacultyCreateDto): Promise<void> {
        return this.facultyService.create(req);
    }

    @Post("edit")
    @UseGuards(AuthGuard('jwt'))
    async edit(@Body() req: FacultyEditDto): Promise<void> {
        return this.facultyService.editFaculty(req);
    }

    @Get("id")
    @UseGuards(AuthGuard('jwt'))
    async getById(@Query("id") id: string): Promise<FacultyDto | undefined> {
        if (!id) throw new BadRequestException();
        return this.facultyService.getById(id);
    }

}
