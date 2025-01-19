import { IsNotEmpty } from 'class-validator';

export class CreateEntryDto {
  @IsNotEmpty({ message: 'Emoji is required' })
  emoji: string;

  @IsNotEmpty({ message: 'Note is required' })
  note: string;
}
