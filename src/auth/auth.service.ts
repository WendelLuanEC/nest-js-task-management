import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredencialsDto } from './dto/auth-credencials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredencialsDto: AuthCredencialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredencialsDto);
  }

  async signIn(authCredencialsDto: AuthCredencialsDto): Promise<string> {
    const { username, password } = authCredencialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if(user && (await bcrypt.compare(password, user.password))){
      return 'success'
    } else{
      throw new UnauthorizedException('Please check your login credencials')
    }
  }
}
