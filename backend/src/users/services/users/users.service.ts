import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {

    fakeUsers = [
        {
            username: 'Sam', 
            password: '12345'
        },
        {
            username: 'Gus', 
            password: '54321'
        },
        {
            username: 'Isa', 
            password: '52341'
        }
    ];

    fetchUsers() {
        return this.fakeUsers;
    }

    createUser(user: CreateUserType) {
        this.fakeUsers.push(user);
        return;
    }

    fetchUserById(id: number) {
        return this.fakeUsers[id];
    }
}
