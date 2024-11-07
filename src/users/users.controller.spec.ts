import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { Users } from './users.entity';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserById: jest.fn().mockResolvedValue({
                id: '123',
                name: 'user1',
                email: 'user1@example.com',
                orders: [{ id: 'order1', date: new Date("2024/12/11") }],
                address: 'Falsa',
                city: 'Falsa',
                country: 'Falsa',
                phone: 1234567
            }),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) }) 
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('getUsersById() debería devolver un usuario por ID', async () => {
    const mockUser: Omit<Users, 'password' | 'orders' | 'isAdmin'> & { orders: { id: string; date: Date }[] } = {
      id: '123',
      name: 'user1',
      email: 'user1@example.com',
      orders: [{ id: 'order1', date: new Date("2024/12/11") }],
      address: 'Falsa',
      city: 'Falsa',
      country: 'Falsa',
      phone: 1234567
    };

    const result = await usersController.getUserById('123');
    
    expect(result).toEqual(mockUser);
  });
});
