import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Get()
    async getUsers() {
        const users = this.userService.fetchUsers();
        return users;
    }

    @Post()
    @UsePipes(new ValidationPipe)
    createUser(@Body() body: CreateUserDto) {
        return this.userService.createUser(body);
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.fetchUserById(id);
        return user;
    }
}
