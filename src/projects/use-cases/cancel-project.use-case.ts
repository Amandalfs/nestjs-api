import { Inject, Injectable } from '@nestjs/common';
import { ProjectsRepositoryInterface } from '../repositories/projects-repository.interfece';
import { CancelProjectDto } from '../dto/cancel-project.dto';

@Injectable()
export class CancelProjectUseCase {
  @Inject('IProjectsRepository')
  private readonly projectsRepository: ProjectsRepositoryInterface;

  async execute({ cancelled_at }: CancelProjectDto, id: string) {
    const project = await this.projectsRepository.find(id);
    project.cancel(cancelled_at);
    await this.projectsRepository.create(project);
    return project;
  }
}
