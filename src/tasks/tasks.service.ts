import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaksDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  createTask(createTaksDto: CreateTaksDto): Task {
    const { title, description } = createTaksDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    this.tasks.splice(index, 1);
  }

  updateTaskById(
    id: string,
    title?: string,
    description?: string,
    status?: TaskStatus,
  ): Task {
    const task = this.getTaskById(id);

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    return task;
  }
}
