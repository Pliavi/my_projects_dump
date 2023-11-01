import { Test, TestingModule } from '@nestjs/testing';
import { FoodsResolver } from './foods.resolver';
import { FoodsService } from './foods.service';
import { UsersService } from 'src/users/users.service';
import { before } from 'node:test';
import { User } from 'src/users/entities/user.entity';
import { Food } from './entities/food.entity';

describe('FoodsResolver', () => {
  let resolver: FoodsResolver;
  let userService: UsersService;

  beforeEach(async () => {
    const mockedUserService: Partial<UsersService> = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodsResolver,
        FoodsService,
        { provide: UsersService, useValue: mockedUserService },
      ],
    }).compile();

    resolver = module.get<FoodsResolver>(FoodsResolver);
    userService = module.get<UsersService>(UsersService);
  });

  it('should return all unreviewed foods by the user', () => {
    const mockUser: User = {
      id: '1',
      email: '',
      password: '',
    };
    const mockFoods: Food[] = [
      { id: '1', name: 'food 1', reviews: [] },
      { id: '2', name: 'food 2', reviews: [] },
    ];

    jest.spyOn(userService, 'findOne').mockImplementation(async () => mockUser);

    jest
      .spyOn(resolver, 'findUnreviewedFoods')
      .mockImplementation(async () => mockFoods);

    expect(resolver.findUnreviewedFoods(mockUser)).toEqual(mockFoods);
  });
});
