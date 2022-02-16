import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: { name: string }): Promise<Users> {
    return this.usersService.createUser(userDto);
  }

  @Get()
  async getUsers(@Query('id') id): Promise<Users[] | Users> {
    return this.usersService.getUsers(id);
  }

  @Patch()
  async updateUser(
    @Body() userDto: { id: number; name: string },
  ): Promise<Users> {
    return this.usersService.updateUser(userDto);
  }

  @Delete()
  async deleteUser(@Body() userDto: { id: number }): Promise<void> {
    return this.usersService.deleteUser(userDto);
  }
}
