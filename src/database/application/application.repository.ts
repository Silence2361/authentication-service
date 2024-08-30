import { InjectModel } from 'nestjs-objection';
import { Application } from './application.model';
import { ModelClass } from 'objection';
import {
  IApplication,
  ICreateApplication,
  IUpdateApplication,
} from './application.interface';

export class ApplicationRepository {
  constructor(
    @InjectModel(Application)
    private readonly applicationModel: ModelClass<Application>,
  ) {}

  async createApplication(
    createApplication: ICreateApplication,
  ): Promise<IApplication> {
    return this.applicationModel.query().insert(createApplication);
  }

  async findApplications(): Promise<IApplication[]> {
    return this.applicationModel.query();
  }

  async findApplcationById(appId: number): Promise<IApplication | null> {
    return this.applicationModel.query().findById(appId);
  }

  async findApplicationByName(name: string): Promise<IApplication | null> {
    const result: IApplication | null = await this.applicationModel
      .query()
      .where('name', name)
      .first();
    return result;
  }

  async updateApplicationById(
    appId: number,
    updateApplication: IUpdateApplication,
  ): Promise<IApplication> {
    return this.applicationModel
      .query()
      .patchAndFetchById(appId, updateApplication);
  }

  async deleteApplicationById(appId: number): Promise<void> {
    await this.applicationModel.query().deleteById(appId);
  }
}
