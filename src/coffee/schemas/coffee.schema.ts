import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CoffeeDocument = HydratedDocument<Coffee>;

@Schema({
  capped: { size: 16384, max: 16, autoIndexId: true },
})
export class Coffee {
  @ApiProperty({ example: 'Kreb-Full-o Choice' })
  @Prop({ required: true })
  blendName: string;

  @ApiProperty({ example: 'Lake Kivu Region, Rwanda' })
  @Prop()
  origin: string;

  @ApiProperty({ example: 'Bourbon' })
  @Prop()
  variety: string;

  @ApiProperty({
    example: ['complex', 'syrupy', 'tangerine', 'mango', 'burnt sugar'],
  })
  @Prop()
  notes: string[];

  @ApiProperty({ example: 'structured' })
  @Prop()
  intensifier: string;

  @ApiProperty({
    example:
      'https://loremflickr.com/cache/resized/65535_51004495027_75e7231077_b_500_500_nofilter.jpg',
  })
  @Prop({ required: true })
  imageURL: string;

  @ApiProperty({ example: 100 })
  @Prop()
  likes: number;
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
