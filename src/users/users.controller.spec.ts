import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UserController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createUser: jest.fn((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    getUsers: jest.fn((id) => {
      if (id) {
        return {
          id,
          name: 'Marius',
        };
      }
      return [
        {
          id: 1,
          name: 'Marius',
        },
        {
          id: 2,
          name: 'Mateo',
        },
      ];
    }),
    updateUser: jest.fn((dto) => dto),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = moduleRef.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { name: 'Marius' };
    expect(await controller.createUser(dto)).toEqual({
      id: expect.any(Number),
      name: 'Marius',
    });

    expect(mockUsersService.createUser).toHaveBeenCalledWith(dto);
  });

  it('should return users', async () => {
    const id = 1;
    expect(await controller.getUsers(id)).toEqual({
      id,
      name: 'Marius',
    });

    expect(await controller.getUsers()).toEqual({
      id,
      name: 'Marius',
    });

    expect(mockUsersService.getUsers).toHaveBeenCalledWith(id);
  });

  it('should update a user', async () => {
    const dto = { id: 1, name: 'Mateo' };
    expect(await controller.updateUser(dto)).toEqual(dto);

    expect(mockUsersService.updateUser).toHaveBeenCalledWith(dto);
  });
});
