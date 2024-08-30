import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateApplicationResponseDto } from './dto/create-application.response.dto';
import { ApplicationService } from './application.service';
import { FindApplicationsResponseDto } from './dto/find-application.response.dto';
import { FindApplicationByIdResponseDto } from './dto/find-application-by-id.response.dto';
import { UpdateApplicationByIdDto } from './dto/update-application-by-id.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<CreateApplicationResponseDto> {
    return this.applicationService.createApplication(createApplicationDto);
  }

  @Get()
  async findApplications(): Promise<FindApplicationsResponseDto[]> {
    return this.applicationService.findApplications();
  }

  @Get(':id')
  async findApplicationById(
    @Param('id') id: number,
  ): Promise<FindApplicationByIdResponseDto> {
    return this.applicationService.findApplicationById({ id });
  }

  @Put(':id')
  async updateApplicationById(
    @Param('id') id: number,
    @Body()
    updateApplicationDto: UpdateApplicationByIdDto,
  ): Promise<void> {
    await this.applicationService.updateApplicationById(
      id,
      updateApplicationDto,
    );
  }

  @Delete(':id')
  async deleteApplicaionById(@Param('id') id: number): Promise<void> {
    await this.applicationService.deleteApplicationById({ id });
  }
}
