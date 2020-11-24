import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Video extends Document {

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: Date,
    required: true,
    trim: true,
  })
  time: Date;

  @Prop({
    type: Date,
    required: true,
    trim: true,
  })
  upload_date: Date;

  @Prop({
    type: Number,
    required: true,
    trim: true,
  })
  nb_like: number;

  @Prop({
    type: Number,
    required: true,
  })
  nb_dislike: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  author: string;

  @Prop({
    type: String,
    required: false,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  path: string;

  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: String,
    required: true,
  })
  thumbnail_path: string;

  @Prop({
    type: Number,
    required: true,
  })
  nb_view: number;

  @Prop({
    type: String,
    required: true,
  })
  url: string;

  @Prop(raw([{
    url: {
      type: String,
      require: true
    }
  }]))
  categories: any;


}

export const VideoSchema = SchemaFactory.createForClass(Video);
