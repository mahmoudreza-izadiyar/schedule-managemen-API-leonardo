import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  id: string;

  @IsInt()
  account_id: number;

  @IsString()
  schedule_id: string;

  @IsDate()
  start_time: Date;

  @IsInt()
  duration: number;

  @IsString()
  type: string;
}
