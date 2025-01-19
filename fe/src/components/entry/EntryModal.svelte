<script lang="ts">
  import Button from "../Button.svelte";
	import FormInput from "../FormInput.svelte";
	import Modal from "../Modal.svelte";
	import type { CreateEntry } from "../../types/component.ts";
	import EmojiSelector from "./EmojiSelector.svelte";
  import { dataEntries } from "$lib/state/entry.svelte.ts";

  interface Props {
    close: () => void
    handleSuccess: (entry: CreateEntry) => void
    loading?: boolean
    modalType: 'add' | 'update'
  }

  let { close, handleSuccess, loading, modalType }: Props = $props()

  const isDisabled = $derived(dataEntries.entry.emoji === '' || dataEntries.entry.note === '')
</script>

<Modal containerClass="w-[420px]">
  <div class="px-6 py-5">
    <h1 class="font-medium text-lg">{modalType === 'add' ? 'Save Entry' : 'Update Entry'}</h1>
    <p class="text-sm text-gray-600">Start tracking your mood today by creating a new entry</p>
    <form class="mt-4 gap-2 flex flex-col">
      <EmojiSelector value={dataEntries.entry.emoji} setEmoji={(emoji: string) => dataEntries.entry.emoji = emoji} />
      <FormInput id="note" placeholder="Add a note 🗒️" bind:value={dataEntries.entry.note} />
    </form>

    <div class="flex flex-col gap-1.5 mt-6">
      <Button label={modalType === 'add' ? 'Save Entry' : 'Update Entry'} onclick={() => handleSuccess(dataEntries.entry)} block disabled={isDisabled} loading={loading} />
      <Button label="Cancel" variant="secondary" onclick={close} block />
    </div>
  </div>
</Modal>

<style>
  .footer {
    @apply bg-gray-100 py-2.5 px-4 flex justify-end rounded-b-md gap-x-2
  }
</style>

