import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ScheduleController', () => {
  let controller: ScheduleController;
  let service: ScheduleService;

  const mockSchedule = {
    id: '1',
    account_id: 123,
    agent_id: 456,
    start_time: new Date(),
    end_time: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockSchedule),
            findAll: jest.fn().mockResolvedValue([mockSchedule]),
            findOne: jest.fn().mockResolvedValue(mockSchedule),
            update: jest.fn().mockResolvedValue(mockSchedule),
            remove: jest.fn().mockResolvedValue(mockSchedule),
          },
        },
      ],
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    // ... (same tests as before for valid and invalid DTOs)
  });

  describe('findAll()', () => {
    it('should return an array of schedules', async () => {
      expect(await controller.findAll()).toEqual([mockSchedule]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a schedule by ID', async () => {
      expect(await controller.findOne('1')).toEqual(mockSchedule);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException for invalid ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null); // Simulate not found

      await expect(controller.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update()', () => {
    it('should update a schedule with valid DTO', async () => {
      const dto: UpdateScheduleDto = {
        account_id: 888,
        agent_id: 999,
      };
      expect(await controller.update('1', dto)).toEqual(mockSchedule);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });

    it('should throw BadRequestException for invalid DTO', async () => {
      const invalidDto: any = { account_id: 'invalid' };

      await expect(controller.update('1', invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(service.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException for invalid ID', async () => {
      const invalidId = 'invalid-id';
      jest.spyOn(service, 'update').mockResolvedValueOnce(null); // Simulate not found

      await expect(controller.update(invalidId, {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove()', () => {
    it('should remove a schedule by ID', async () => {
      expect(await controller.remove('1')).toEqual(mockSchedule);
      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException for invalid ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce(null); // Simulate not found

      await expect(controller.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
