import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.userService.findByEmail(registerDto.email);
    if (user) throw new UnauthorizedException('User already exists');

    const newUser = await this.userService.create(registerDto);
    return {message: "Successfully registered", newUser}
  }
  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await this.userService.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.signToken(user);
    return {message: "Success", access_token: token };
  }

  private signToken (user: UserDocument) {
      return this.jwtService.sign({
      sub: user._id,
      email: user.email,
      role: user.role,
    });
  }
}
