import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ toJSON: { virtuals: true }, versionKey: false })
export class Category extends Document {

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  thumbnail: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  url: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
