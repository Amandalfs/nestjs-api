import { Project } from '../entities/project.entity';
import { RepositoryInterface } from './repository.interfece';

export interface ProjectsRepositoryInterface
  extends RepositoryInterface<Project> {}
