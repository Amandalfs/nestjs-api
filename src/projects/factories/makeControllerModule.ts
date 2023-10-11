import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '../entities/project.entity';
import { ProjectsRepositoryInterface } from '../repositories/projects-repository.interfece';
import { CreateProjectUseCase } from '../use-cases/create-project.use-case';
import { StartProjectUseCase } from '../use-cases/start-project.use-case';
import { CancelProjectUseCase } from '../use-cases/cancel-project.use-case';
import { FinishProjectUseCase } from '../use-cases/finish-project.use-case';
import { FindAllProjectsUseCase } from '../use-cases/findAll-projects.use-case';
import { FindProjectUseCase } from '../use-cases/find-project.use-case';
import { ProjectsController } from '../projects.controller';

export class MakeModuleMock {
  static async execute(): Promise<TestingModule> {
    class ProjectsRepositoryMock implements ProjectsRepositoryInterface {
      async create(): Promise<void> {}
      async update(): Promise<void> {}
      async find(): Promise<Project> {
        return new Project({
          name: 'Project1',
          description: 'Description1',
        });
      }
      async findAll(): Promise<Project[]> {
        return [
          new Project({
            name: 'Project1',
            description: 'Description1',
          }),
          new Project({
            name: 'Project1',
            description: 'Description1',
          }),
        ];
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        CreateProjectUseCase,
        StartProjectUseCase,
        CancelProjectUseCase,
        FinishProjectUseCase,
        FindAllProjectsUseCase,
        FindProjectUseCase,
        ProjectsRepositoryMock,
        {
          provide: 'IProjectsRepository',
          useExisting: ProjectsRepositoryMock,
        },
      ],
    }).compile();
    return module;
  }
}
