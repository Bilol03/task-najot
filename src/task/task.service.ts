import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'src/interfaces/user.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schema/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  create(createTaskDto: CreateTaskDto, user: UserInterface) {
    const task = new this.taskModel({
      ...createTaskDto,
      createdBy: user.id,
    });
    return task.save();
  }

  findAll(user: UserInterface) {
    return this.taskModel.find({ createdBy: user.id }).exec();
  }

  async findOne(id: string, user: UserInterface) {
    const task = await this.taskModel
      .findOne({ _id: id, createdBy: user.id })
      .exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: UserInterface) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, createdBy: user.id },
      updateTaskDto,
      { new: true },
    );
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async remove(id: string, user: UserInterface) {
    const task = await this.taskModel.findOneAndDelete({
      _id: id,
      createdBy: user.id,
    });
    if (!task) throw new NotFoundException('Task not found');
    return { message: 'Task deleted' };
  }
}
