import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;

  const mockTaskService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new task by a given data', async () => {
    // arrange
    const createTaskDto = {
      account_id: 123,
      schedule_id: '1',
      start_time: new Date(),
      duration: 60,
      type: 'WORK',
    } as CreateTaskDto;

    const task = {
      id: '1',
      account_id: 123,
      schedule_id: '1',
      start_time: new Date(),
      duration: 60,
      type: 'WORK',
    } as Task;

    jest.spyOn(mockTaskService, 'create').mockReturnValue(task);

    // act
    const result = await controller.create(createTaskDto);

    // assert
    expect(mockTaskService.create).toBeCalled();
    expect(mockTaskService.create).toBeCalledWith(createTaskDto);

    expect(result).toEqual(task);
  });

  it('findAll => should return an array of tasks', async () => {
    // arrange
    const task = {
      id: '1',
      account_id: 123,
      schedule_id: '1',
      start_time: new Date(),
      duration: 60,
      type: 'WORK',
    };
    const tasks = [task];
    jest.spyOn(mockTaskService, 'findAll').mockReturnValue(tasks);

    // act
    const result = await controller.findAll();

    // assert
    expect(result).toEqual(tasks);
    expect(mockTaskService.findAll).toBeCalled();
  });

  it('findOne => should find a task by a given id and return its data', async () => {
    // arrange
    const id = '1';
    const task = {
      id: '1',
      account_id: 123,
      schedule_id: '1',
      start_time: new Date(),
      duration: 60,
      type: 'WORK',
    };

    jest.spyOn(mockTaskService, 'findOne').mockReturnValue(task);

    // act
    const result = await controller.findOne(id);

    expect(result).toEqual(task);
    expect(mockTaskService.findOne).toBeCalled();
    expect(mockTaskService.findOne).toBeCalledWith(id);
  });

  it('update => should find a task by a given id and update its data', async () => {
    // arrange
    const id = '1';
    const updateTaskDto = {
      account_id: 123,
      schedule_id: '1',
      start_time: new Date(),
      duration: 60,
      type: 'WORK',
    } as UpdateTaskDto;
    const task = {
      id: '1',
      account_id: 123,
      schedule_id: '1',
      start_time: new Date(),
      duration: 60,
      type: 'WORK',
    };

    jest.spyOn(mockTaskService, 'update').mockReturnValue(task);

    // act
    const result = await controller.update(id, updateTaskDto);

    expect(result).toEqual(task);
    expect(mockTaskService.update).toBeCalled();
    expect(mockTaskService.update).toBeCalledWith(id, updateTaskDto);
  });

  it('remove => should find a task by a given id, remove and then return the removed task', async () => {
    const id = '1';
    const task = {
      id: '1',
      account_id: 123,
      schedule_id: '1',
      start_time: new Date(),
      duration: 60,
      type: 'WORK',
    };

    jest.spyOn(mockTaskService, 'remove').mockReturnValue(task);

    // act
    const result = await controller.remove(id);

    expect(result).toEqual(task);
    expect(mockTaskService.remove).toBeCalled();
    expect(mockTaskService.remove).toBeCalledWith(id);
  });
});
