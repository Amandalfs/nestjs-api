import { Inject, Injectable } from '@nestjs/common';
import { FindProjectDto } from '../dto/find-project.dto';
import { ProjectsRepositoryInterface } from '../repositories/projects-repository.interfece';

@Injectable()
export class FindProjectUseCase {
  @Inject('IProjectsRepository')
  private readonly projectsRepository: ProjectsRepositoryInterface;

  async execute({ id }: FindProjectDto) {
    const project = await this.projectsRepository.find(id);
    return project;
  }
}
