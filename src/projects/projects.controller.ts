import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectUseCase } from './use-cases/create-project.use-case';
import { Inject } from '@nestjs/common/decorators';
import { FindProjectUseCase } from './use-cases/find-project.use-case';
import { StartProjectUseCase } from './use-cases/start-project.use-case';
import { StartProjectDto } from './dto/start-project.dto';
import { FindAllProjectsUseCase } from './use-cases/findAll-projects.use-case';
import { CancelProjectDto } from './dto/cancel-project.dto';
import { CancelProjectUseCase } from './use-cases/cancel-project.use-case';
import { FinishProjectDto } from './dto/finish-project.dto';
import { FinishProjectUseCase } from './use-cases/finish-project.use-case';

@Controller('projects')
export class ProjectsController {
  @Inject()
  private readonly createProjectUseCase: CreateProjectUseCase;

  @Inject()
  private readonly findProjectUseCase: FindProjectUseCase;

  @Inject()
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase;

  @Inject()
  private readonly startProjectUseCase: StartProjectUseCase;

  @Inject()
  private readonly cancelProjectUseCase: CancelProjectUseCase;

  @Inject()
  private readonly finishProjectUseCase: FinishProjectUseCase;

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.findProjectUseCase.execute({ id });
  }

  @Post('/:id/start')
  start(@Param('id') id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(startProjectDto, id);
  }

  @Post('/:id/cancel')
  cancel(@Param('id') id: string, @Body() cancelProjectDto: CancelProjectDto) {
    return this.cancelProjectUseCase.execute(cancelProjectDto, id);
  }

  @Post('/:id/finish')
  finish(@Param('id') id: string, @Body() finishProjectDto: FinishProjectDto) {
    return this.finishProjectUseCase.execute(finishProjectDto, id);
  }
}
