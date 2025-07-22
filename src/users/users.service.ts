import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  
  async create(data: Partial<User>) {
    if(!data.password) throw new BadRequestException(400, "Password is required")
    const hashed = bcrypt.hash(data.password, 10);
    const createdUser = new this.userModel({
      ...data,
      password: hashed,
    });
    return await createdUser.save();
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
