import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredencialsDto } from './dto/auth-credencials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  // Precisamos injetar o DataSource e chamar o super
  constructor(private dataSource: DataSource) {
    // O super recebe (entidade, entityManager)
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredencialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
