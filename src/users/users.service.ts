import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from 'src/auth/dto/register-auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: RegisterDto) {
    if (!data.password)
      throw new BadRequestException(400, 'Password is required');
    const hashed = await bcrypt.hash(data.password, 10);
    const createdUser = new this.userModel({
      ...data,
      password: hashed,
    });
    return createdUser.save();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  findById(id: number) {
    return this.userModel.findById(id).select('-password');
  }

  async validatePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
