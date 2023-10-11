import { Inject, Injectable } from '@nestjs/common';
import { ProjectsRepositoryInterface } from '../repositories/projects-repository.interfece';

@Injectable()
export class FindAllProjectsUseCase {
  @Inject('IProjectsRepository')
  private readonly projectsRepository: ProjectsRepositoryInterface;

  execute() {
    return this.projectsRepository.findAll();
  }
}
