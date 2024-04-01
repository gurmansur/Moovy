import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDataDto } from '../dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService) {}

    async validateUser(authData: AuthDataDto) {
        const findUser = await this.userRepository.findOne({where: {username: authData.username}})

        if (!findUser) return null;

        if (findUser.password === authData.password) {

            const { password, ...user } = findUser;

            return this.jwtService.sign(user)
        
        } else return null;
    }

}
