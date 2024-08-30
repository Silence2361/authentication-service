import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IApplication,
  ICreateApplication,
  ICreateApplicationResponse,
  IDeleteApplicationById,
  IFindApplicationById,
  IFindApplicationsResponse,
  IUpdateApplication,
} from 'src/database/application/application.interface';
import { ApplicationRepository } from 'src/database/application/application.repository';

@Injectable()
export class ApplicationService {
  constructor(private readonly applicationRepository: ApplicationRepository) {}

  async createApplication(
    params: ICreateApplication,
  ): Promise<ICreateApplicationResponse> {
    const { name, description, ownerId } = params;

    const existingApp =
      await this.applicationRepository.findApplicationByName(name);

    if (existingApp) {
      throw new ConflictException(`Application with ${name} already existed`);
    }

    const app: IApplication =
      await this.applicationRepository.createApplication({
        name,
        description,
        ownerId,
      });

    return { id: app.id };
  }

  async findApplications(): Promise<IFindApplicationsResponse[]> {
    const apps: IApplication[] =
      await this.applicationRepository.findApplications();

    return apps.map((app) => ({
      id: app.id,
      name: app.name,
      description: app.description,
      ownerId: app.ownerId,
    }));
  }

  async findApplicationById(
    params: IFindApplicationById,
  ): Promise<IFindApplicationsResponse> {
    const { id } = params;

    const app: IApplication | null =
      await this.applicationRepository.findApplcationById(id);

    if (!app) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    return {
      id: app.id,
      name: app.name,
      description: app.description,
      ownerId: app.ownerId,
    };
  }

  async updateApplicationById(
    appId: number,
    params: IUpdateApplication,
  ): Promise<void> {
    const { name, description } = params;

    const app: IApplication | null =
      await this.applicationRepository.findApplcationById(appId);

    if (!app) {
      throw new NotFoundException(`Application with id ${appId} not found`);
    }

    const updateAppData = {
      name,
      description,
    };

    await this.applicationRepository.updateApplicationById(
      appId,
      updateAppData,
    );
  }

  async deleteApplicationById(params: IDeleteApplicationById): Promise<void> {
    const { id } = params;

    const app = await this.applicationRepository.findApplcationById(id);

    if (!app) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    await this.applicationRepository.deleteApplicationById(id);
  }
}
