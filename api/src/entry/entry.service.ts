import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from 'src/schema/entry.schema';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class EntryService {
  constructor(@InjectModel(Entry.name) private entryModel: Model<Entry>) {}

  async findAll(): Promise<Entry[]> {
    return this.entryModel.find().exec();
  }

  async create(entry: CreateEntryDto): Promise<Entry> {
    const createdEntry = await this.entryModel.create(entry);
    return createdEntry;
  }

  async update(id: string, entry: Partial<CreateEntryDto>): Promise<Entry> {
    return this.entryModel
      .findByIdAndUpdate({ _id: id }, entry, { new: true })
      .exec();
  }

  async delete(id: string): Promise<null> {
    await this.entryModel.findByIdAndDelete({ _id: id }).exec();
    return null;
  }
}
