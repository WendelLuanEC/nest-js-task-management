import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredencialsDto } from './dto/auth-credencials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredencialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      if ((error.code = '23505')) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
