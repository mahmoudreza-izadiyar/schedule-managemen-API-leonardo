import { Test, TestingModule } from '@nestjs/testing';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

describe('ScheduleController', () => {
  let controller: ScheduleController;

  const mockScheduleService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: mockScheduleService,
        },
      ],
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new schedule by a given data', async () => {
    // arrange
    const createScheduleDto = {
      account_id: 123,
      agent_id: 456,
      start_time: new Date(),
      end_time: new Date(),
    } as CreateScheduleDto;

    const schedule = {
      id: '1',
      account_id: 123,
      agent_id: 456,
      start_time: new Date(),
      end_time: new Date(),
    } as Schedule;

    jest.spyOn(mockScheduleService, 'create').mockReturnValue(schedule);

    // act
    const result = await controller.create(createScheduleDto);

    // assert
    expect(mockScheduleService.create).toBeCalled();
    expect(mockScheduleService.create).toBeCalledWith(createScheduleDto);

    expect(result).toEqual(schedule);
  });

  it('findAll => should return an array of schedules', async () => {
    // arrange
    const schedule = {
      id: '1',
      account_id: 123,
      agent_id: 456,
      start_time: new Date(),
      end_time: new Date(),
    };
    const schedules = [schedule];
    jest.spyOn(mockScheduleService, 'findAll').mockReturnValue(schedules);

    // act
    const result = await controller.findAll();

    // assert
    expect(result).toEqual(schedules);
    expect(mockScheduleService.findAll).toBeCalled();
  });

  it('findOne => should find a schedule by a given id and return its data', async () => {
    // arrange
    const id = '1';
    const schedule = {
      id: '1',
      account_id: 123,
      agent_id: 456,
      start_time: new Date(),
      end_time: new Date(),
    };

    jest.spyOn(mockScheduleService, 'findOne').mockReturnValue(schedule);

    // act
    const result = await controller.findOne(id);

    expect(result).toEqual(schedule);
    expect(mockScheduleService.findOne).toBeCalled();
    expect(mockScheduleService.findOne).toBeCalledWith(id);
  });

  it('update => should find a schedule by a given id and update its data', async () => {
    // arrange
    const id = '1';
    const updateScheduleDto = {
      account_id: 123,
      agent_id: 456,
      start_time: new Date(),
      end_time: new Date(),
    } as UpdateScheduleDto;
    const schedule = {
      id: '1',
      account_id: 123,
      agent_id: 456,
      start_time: new Date(),
      end_time: new Date(),
    };

    jest.spyOn(mockScheduleService, 'update').mockReturnValue(schedule);

    // act
    const result = await controller.update(id, updateScheduleDto);

    expect(result).toEqual(schedule);
    expect(mockScheduleService.update).toBeCalled();
    expect(mockScheduleService.update).toBeCalledWith(id, updateScheduleDto);
  });

  it('remove => should find a schedule by a given id, remove and then return the removed schedule', async () => {
    const id = '1';
    const schedule = {
      id: '1',
      account_id: 123,
      agent_id: 456,
      start_time: new Date(),
      end_time: new Date(),
    };

    jest.spyOn(mockScheduleService, 'remove').mockReturnValue(schedule);

    // act
    const result = await controller.remove(id);

    expect(result).toEqual(schedule);
    expect(mockScheduleService.remove).toBeCalled();
    expect(mockScheduleService.remove).toBeCalledWith(id);
  });
});
