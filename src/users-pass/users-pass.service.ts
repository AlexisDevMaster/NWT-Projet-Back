import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class UsersPassService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto) {
    let user = new UserEntity({username: createUserDto.body["username"], password:"", salt:"", verified:false});

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createUserDto.body["password"], salt);
    user.password =  hash;
    user.salt = salt;

    const createdUser = new this.userModel(user);
    return await createdUser.save();

  }

  findOneByUsername(username) {
    return this.userModel.findOne({username: username});
  }
  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }
}
