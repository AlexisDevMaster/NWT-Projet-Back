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

    let user = new UserEntity({username: createUserDto.body["username"], password:createUserDto.body["username"], verified:false});

    user.password = bcrypt.hashSync(user.password, 10);

    const createdUser = new this.userModel(user);
    // // NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'

    return await createdUser.save();

  }

  async findOneByUsername(username) {
    return await this.userModel.findOne({username: username});
  }
  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }
}
