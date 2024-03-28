import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserType } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }

    async fetchUsers() {
        return this.userRepository.find();
    }

    createUser(user: CreateUserType) {
        const newUser = this.userRepository.create({ ...user });
        return this.userRepository.save(newUser);
    }

    fetchUserById(id: number) {
        return this.userRepository.findBy({id});
    }
}
