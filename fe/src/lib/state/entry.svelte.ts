import type { CreateEntry, Entry } from "../../types/component.ts"

export const dataEntries: { entry: CreateEntry, entries: Entry[] } = $state({
  entry: { emoji: '', note: '' },
  entries: []
})