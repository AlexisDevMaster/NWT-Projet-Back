import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserLogin } from './user.interface';

const SALT_WORK_FACTOR = 10;

export const UserLoginSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


