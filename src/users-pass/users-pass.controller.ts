import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersPassService } from './users-pass.service';

@Controller('/register')
export class UsersPassController {

    constructor(private usersService: UsersPassService) {
    }

    @Post() 
    async create(@Request() createUserDto) {
        return await this.usersService.create(createUserDto);
    }

    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute(){
        return {
            message: 'You did it!'
        }
    }

}
