import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoffeeDocument = HydratedDocument<Coffee>;

@Schema({
  capped: { size: 1024 * 16, max: 10, autoIndexId: true },
  collection: 'coffee',
})
export class Coffee {
  @Prop({ required: true })
  blendName: string;

  @Prop()
  origin: string;

  @Prop()
  variety: string;

  @Prop()
  notes: string[];

  @Prop()
  intensifier: string;

  @Prop({ required: true })
  imageURL: string;

  @Prop()
  likes: number;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
