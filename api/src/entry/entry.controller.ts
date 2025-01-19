import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EntryService } from './entry.service';
import { Entry } from 'src/schema/entry.schema';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Get()
  findAll(): Promise<Entry[]> {
    return this.entryService.findAll();
  }

  @Post()
  async create(@Body() entry: CreateEntryDto) {
    return this.entryService.create(entry);
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() entry: Partial<CreateEntryDto>,
  ) {
    return this.entryService.update(id, entry);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.entryService.delete(id);
  }
}
