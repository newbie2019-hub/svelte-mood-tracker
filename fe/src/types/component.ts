export type Entry = CreateEntry & { _id: string }

export type CreateEntry = {
  emoji: string
  note: string
}

export type DateInfo = {
  day: number,
  month: string,
  year: string
  weekday: string
}