import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import {config} from 'dotenv'
config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'yourjwtsecretkey',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
