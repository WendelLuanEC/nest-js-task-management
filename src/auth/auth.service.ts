import { Injectable } from '@nestjs/common';
import { AuthCredencialsDto } from './dto/auth-credencials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredencialsDto: AuthCredencialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredencialsDto);
  }
}
