import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDataDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req: Request) {
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        return req.user;
    }
}
