import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class User extends Document {

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  salt: string;

  @Prop({
    type: Boolean,
    required: true,
    trim: true,
  })
  verified: boolean;

  @Prop(raw([{
    url: {
      type: String,
      required: true,
      trim: true,
    },
    isLiked: {
      type: Number,
      required: true,
      trim: true,
    }
  }]))
  likes: any;

  @Prop(raw([{
    username: {
      type: String,
      required: true,
      trim: true,
    }
  }]))
  subscriptions: any;

}

export const UserSchema = SchemaFactory.createForClass(User);
