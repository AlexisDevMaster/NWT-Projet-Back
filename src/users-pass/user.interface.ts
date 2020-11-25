import * as mongoose from 'mongoose';

export interface UserLogin extends mongoose.Document{
    username: string
    password: string;
}
