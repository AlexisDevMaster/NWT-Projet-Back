import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersPassService } from '../users-pass/users-pass.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersPassService, private jwtService: JwtService){

  }

  async validateUserByPassword(loginAttempt: Request) {

    // This will be used for the initial login
    const userToAttempt = await this.usersService.findOneByUsername(loginAttempt.body["username"]);

    const result = await bcrypt.compare(loginAttempt.body["password"], userToAttempt.password);

    if(result){
      return this.createJwtPayload(userToAttempt);
    }else{
      throw new UnauthorizedException();
    }


  }

  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByUsername(payload.username);
    if(user){
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }

  }

  createJwtPayload(user){
    const data: JwtPayload = {
      username: user.username
    };
    console.log(this.jwtService.sign(data));
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt
    }
  }
}

