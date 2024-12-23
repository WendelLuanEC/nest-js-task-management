import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    // Registrar a entidade
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    // Criar um provider manualmente p/ UsersRepository
    {
      provide: UsersRepository,
      useFactory: (dataSource: DataSource) => {
        return new UsersRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
