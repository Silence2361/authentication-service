import { IsOptional, IsString } from 'class-validator';

export class UpdateApplicationByIdDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  descrition?: string;
}
