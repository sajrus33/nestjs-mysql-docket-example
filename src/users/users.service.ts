import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  getUsers(id?: number): Promise<Users[] | Users> {
    if (id) {
      return this.usersRepository.findOneOrFail(id);
    }
    return this.usersRepository.find();
  }

  createUser(userDto: { name: string }): Promise<Users> {
    const { name } = userDto;
    const newUser = this.usersRepository.create({ name });
    return this.usersRepository.save(newUser);
  }

  async updateUser(userDto: { id: number; name: string }): Promise<Users> {
    const { id, name } = userDto;
    const user = await this.usersRepository.findOneOrFail(id);
    user.name = name;
    return this.usersRepository.save(user);
  }

  async deleteUser(userDto: { id: number }): Promise<void> {
    const { id } = userDto;
    await this.usersRepository.delete(id);
  }
}
