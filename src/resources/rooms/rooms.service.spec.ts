import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: getRepositoryToken(Room),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('findAll should return an array of rooms', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce([
      {
        id: '1',
        name: 'test',
        description: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        booking: [],
      } as Room,
    ]);
    const rooms = await service.findAll();

    expect(rooms).toHaveLength(1);
    expect(rooms).toBeInstanceOf(Array);
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findAll).toHaveBeenCalledWith();
    expect(service.findAll).toHaveReturned();
  });

  it('should create a room', () => {
    const testRoom = {
      name: 'test1',
      description: '',
    };
    expect(service.create(testRoom)).toEqual('This action adds a new room');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
