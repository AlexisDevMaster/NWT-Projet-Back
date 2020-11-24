import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersPassService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        username: 'John',
        password: 'changeme',
      },
      {
        username: 'chris',
        password: 'secret',
      },
      {
        username: 'maria',
        password: 'guess',
      },
      {
        username: 'maria2',
        password: 'guess',
      }
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
