import { Controller, Get } from "@nestjs/common";

@Controller("user")
export class UserController {
  @Get()
  async getUser() {
    return "Hello World";
  }
}