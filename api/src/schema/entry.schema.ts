import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EntryDocument = HydratedDocument<Entry>;

@Schema()
export class Entry {
  @Prop({ required: true })
  emoji: string;

  @Prop({ required: true })
  note: string;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
