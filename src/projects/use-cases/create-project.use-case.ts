import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ProjectsRepositoryInterface } from '../repositories/projects-repository.interfece';

@Injectable()
export class CreateProjectUseCase {
  @Inject('IProjectsRepository')
  private readonly projectsRepository: ProjectsRepositoryInterface;

  async execute(input: CreateProjectDto) {
    const project = new Project(input);
    await this.projectsRepository.create(project);
    return project;
  }
}
