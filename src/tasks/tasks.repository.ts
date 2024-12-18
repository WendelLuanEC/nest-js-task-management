import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaksDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaksDto: CreateTaksDto): Promise<Task> {
    const { title, description } = createTaksDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
}
