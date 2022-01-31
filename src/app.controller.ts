import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './users.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() userData: { name: string }): Promise<Users> {
    const { name } = userData;
    return this.appService.createUser(name);
  }

  @Get()
  async getUsers(@Query('id') id): Promise<Users[] | Users> {
    if (id) {
      return this.appService.getOneById(id);
    }
    return this.appService.getAll();
  }

  @Patch()
  async updateUser(
    @Body() userData: { id: number; name: string },
  ): Promise<Users> {
    const { id, name } = userData;
    return this.appService.updateUser(id, name);
  }

  @Delete()
  async deleteUser(@Body() userData: { id: number }): Promise<void> {
    const { id } = userData;
    return this.appService.deleteUser(id);
  }
}
