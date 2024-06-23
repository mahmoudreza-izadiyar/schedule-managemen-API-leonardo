import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: createScheduleDto,
    });
  }

  async findAll() {
    return this.prisma.schedule.findMany();
  }

  findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: { id },
    });
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  async remove(id: string) {
    try {
      console.log(`Deleting tasks for schedule_id: ${id}`);

      await this.prisma.task.deleteMany({
        where: { schedule_id: id.toString() },
      });

      const deletedSchedule = await this.prisma.schedule.delete({
        where: { id },
      });

      console.log(`Successfully deleted schedule with id: ${id}`);
      return deletedSchedule;
    } catch (error) {
      console.error(
        `Error occurred while deleting schedule with id: ${id}`,
        error,
      );
      throw error;
    }
  }
}
