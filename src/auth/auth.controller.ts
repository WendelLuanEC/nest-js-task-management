import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredencialsDto } from './dto/auth-credencials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredencialsDto: AuthCredencialsDto): Promise<void> {
    return this.authService.signUp(authCredencialsDto);
  }
  @Post('/signin')
  signIn(@Body() authCredencialsDto: AuthCredencialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredencialsDto);
  }
}
