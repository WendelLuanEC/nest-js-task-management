import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaksDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

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

  async deleteTask(id: string): Promise<void>{
    const result = await this.tasksRepository.delete(id);
    console.log(result);

    if(result.affected === 0){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
