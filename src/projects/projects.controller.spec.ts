import { ProjectsController } from './projects.controller';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { Project } from './entities/project.entity';
import { MakeModuleMock } from './factories/makeControllerModule';
import { FindAllProjectsUseCase } from './use-cases/findAll-projects.use-case';
import { FindProjectUseCase } from './use-cases/find-project.use-case';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let createProjectUseCase: CreateProjectUseCase;
  let findAllProjectUseCase: FindAllProjectsUseCase;
  let findProjectUseCase: FindProjectUseCase;

  beforeEach(async () => {
    const module = await MakeModuleMock.execute();
    controller = module.get<ProjectsController>(ProjectsController);
    createProjectUseCase =
      module.get<CreateProjectUseCase>(CreateProjectUseCase);
    findAllProjectUseCase = module.get<FindAllProjectsUseCase>(
      FindAllProjectsUseCase,
    );
    findProjectUseCase = module.get<FindProjectUseCase>(FindProjectUseCase);
  });

  it('should create project', async () => {
    const entity = new Project({
      name: 'Project1',
      description: 'Description 1',
    });
    jest.spyOn(createProjectUseCase, 'execute').mockResolvedValue(entity);

    const project = await controller.create({
      name: 'Project1',
      description: 'Description 1',
    });

    expect(project).toEqual(entity);
  });

  it('should findAll Projects', async () => {
    const entities = [
      new Project({
        name: 'Project1',
        description: 'Description 1',
      }),
      new Project({
        name: 'Project1',
        description: 'Description 1',
      }),
    ];
    jest.spyOn(findAllProjectUseCase, 'execute').mockResolvedValue(entities);

    const projects = await controller.findAll();
    expect(projects).toEqual(entities);
  });

  it('should find by id Project', async () => {
    const entity = new Project({
      name: 'Project1',
      description: 'Description 1',
    });

    jest.spyOn(findProjectUseCase, 'execute').mockResolvedValue(entity);

    const project = await controller.findById(entity.id);
    expect(project).toEqual(entity);
  });
});
