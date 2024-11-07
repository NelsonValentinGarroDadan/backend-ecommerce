import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/createUser.dto';

describe('AuthService - singUp', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            postUser: jest.fn().mockResolvedValue({
              id:"1234"
            }),
            getUserById: jest.fn().mockResolvedValue({
              id: "1234",
              email: 'newuser@example.com',
              name: 'New User',
              address:'Falsa 123',
              city: 'Falsa',
              country: 'Falsa',
              phone: 123456,
              isAdmin: false,
              orders: []
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('singup() devulve al usuario creado, sin datos sensibles', async () => {
    const newUser: CreateUserDto = {
      email: 'newuser@example.com',
      password: 'password123',
      name: 'New User',
      address:'Falsa 123',
      city: 'Falsa',
      confirmPassword:'password123',
      country: 'Falsa',
      phone: 123456
    };

    const result = await authService.singUp(newUser);

    expect(result).toEqual({
      id: "1234",
      email: 'newuser@example.com',
      name: 'New User',
      address:'Falsa 123',
      city: 'Falsa',
      country: 'Falsa',
      phone: 123456,
      isAdmin: false,
      orders: []
    });

  });
});
