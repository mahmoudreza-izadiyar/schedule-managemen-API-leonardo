import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string) {
    try {
      console.log(`Deleting task with id: ${id}`);

      const deletedTask = await this.prisma.task.delete({
        where: { id },
      });

      console.log(`Successfully deleted task with id: ${id}`);
      return deletedTask;
    } catch (error) {
      console.error(`Error occurred while deleting task with id: ${id}`, error);
      throw error;
    }
  }
}
