import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        id: '1',
        account_id: 1,
        schedule_id: '1',
        start_time: new Date(),
        duration: 60,
        type: 'Test Type',
      };
      const result = {
        id: '1',
        account_id: 1,
        schedule_id: '1',
        start_time: new Date(),
        duration: 60,
        type: 'Test Type',
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createTaskDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = [
        {
          id: '1',
          account_id: 1,
          schedule_id: '1',
          start_time: new Date(),
          duration: 60,
          type: 'Test Type',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const result = {
        id: '1',
        account_id: 1,
        schedule_id: '1',
        start_time: new Date(),
        duration: 60,
        type: 'Test Type',
      };
      const id = '1';
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        account_id: 1,
        schedule_id: '1',
        start_time: new Date(),
        duration: 120,
        type: 'Updated Type',
      };
      const id = '1';
      const updatedTask = {
        id: '1',
        account_id: 1,
        schedule_id: '1',
        start_time: new Date(),
        duration: 120,
        type: 'Updated Type',
      };
      jest.spyOn(service, 'update').mockResolvedValue(updatedTask);

      expect(await controller.update(id, updateTaskDto)).toBe(updatedTask);
      expect(service.update).toHaveBeenCalledWith(id, updateTaskDto);
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const id = '1';
      const result = {
        id: '1',
        account_id: 1,
        schedule_id: '1',
        start_time: new Date(),
        duration: 60,
        type: 'Test Type',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
