import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>
    ) {}

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id: id } });
    }

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}