import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
  exports: [TasksRepository],
})
export class TasksModule {}
