import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  id: string;

  @IsInt()
  account_id: number;

  @IsInt()
  agent_id: number;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}
