import { Inject, Injectable } from '@nestjs/common';
import { ProjectsRepositoryInterface } from '../repositories/projects-repository.interfece';
import { FinishProjectDto } from '../dto/finish-project.dto';

@Injectable()
export class FinishProjectUseCase {
  @Inject('IProjectsRepository')
  private readonly projectsRepository: ProjectsRepositoryInterface;

  async execute({ finished_at }: FinishProjectDto, id: string) {
    const project = await this.projectsRepository.find(id);
    project.finish(finished_at);
    await this.projectsRepository.create(project);
    return project;
  }
}
