import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserSubscriptionsEntity } from '../entities/user-subscriptions.entity';
import { UserLikesEntity } from '../entities/user-likes.entity';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class User extends Document {

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: Number,
    required: true,
    trim: true,
  })
  isVerified: number;

  @Prop(raw({
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
  }))
  likes: any;

  @Prop(raw({
    name: {
      type: String,
      required: true,
      trim: true,
    }
  }))
  subscriptions: any;

}

export const UserSchema = SchemaFactory.createForClass(User);
