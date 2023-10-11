import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';

import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsRepositoryTypeOrm } from './repositories/projects-repository.typeorm';

import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { FindAllProjectsUseCase } from './use-cases/findAll-projects.use-case';
import { FindProjectUseCase } from './use-cases/find-project.use-case';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { FinishProjectUseCase } from './use-cases/finish-project.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [
    CreateProjectUseCase,
    StartProjectUseCase,
    CancelProjectUseCase,
    FinishProjectUseCase,
    FindAllProjectsUseCase,
    FindProjectUseCase,
    ProjectsRepositoryTypeOrm,
    {
      provide: 'IProjectsRepository',
      useExisting: ProjectsRepositoryTypeOrm,
    },
  ],
})
export class ProjectsModule {}
