import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaksDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  createTask(createTaksDto: CreateTaksDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaksDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
