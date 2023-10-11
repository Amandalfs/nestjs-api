import { Inject, Injectable } from '@nestjs/common';
import { StartProjectDto } from '../dto/start-project.dto';
import { ProjectsRepositoryInterface } from '../repositories/projects-repository.interfece';

@Injectable()
export class StartProjectUseCase {
  @Inject('IProjectsRepository')
  private readonly projectsRepository: ProjectsRepositoryInterface;

  async execute({ started_at }: StartProjectDto, id: string) {
    const project = await this.projectsRepository.find(id);
    project.start(started_at);
    await this.projectsRepository.create(project);
    return project;
  }
}
