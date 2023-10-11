import { Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { ProjectsRepositoryInterface } from './projects-repository.interfece';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsRepositoryTypeOrm implements ProjectsRepositoryInterface {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
  ) {}

  async create(Entity: Project): Promise<void> {
    await this.projectsRepo.save(Entity);
  }

  async update(Entity: Project): Promise<void> {
    await this.projectsRepo.save(Entity);
  }

  find(id: string): Promise<Project> {
    return this.projectsRepo.findOneOrFail({ where: { id } });
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepo.find();
  }
}
