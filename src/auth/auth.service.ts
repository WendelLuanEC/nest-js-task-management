import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredencialsDto } from './dto/auth-credencials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredencialsDto: AuthCredencialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredencialsDto);
  }

  async signIn(
    authCredencialsDto: AuthCredencialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredencialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credencials');
    }
  }
}
