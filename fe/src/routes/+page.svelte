<script lang="ts">
	import { onMount } from "svelte";
  import Button from "../components/Button.svelte";
	import EntryModal from "../components/entry/EntryModal.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import type { Entry, DateInfo, CreateEntry } from '../types/component.ts'
	import { getDateInfo } from "$lib/helpers.js";
	import EntryList from "../components/entry/EntryList.svelte";
  import { dataEntries } from "$lib/state/entry.svelte.ts";
	import api from "$lib/api.js";

  let dateInfo = $state<DateInfo>({ day: 0, month: '', year: '', weekday: '' })
  let showModal: boolean = $state(false)
  let isLoading: boolean = $state(false)
  let modalType: 'add' | 'update' = $state('add')
  let selectedEntryId: string = $state('')

  const fetchEntries = async () => {
    const data = await fetch('http://localhost:3000/entry')
      .then(res => res.json())
      .then(res => res)
    dataEntries.entries = data
  }

  const setCurrentDate = () => {
    dateInfo = getDateInfo()
  }

  const showAddEntry = () => {
    modalType = 'add'
    resetForm()
    showModal = true
  }

  const saveEntry = async (entry: CreateEntry) => {
    isLoading = true
    modalType = 'add'
    const response = await api.post('entry', entry)

    if (response.status === 201) {
      dataEntries.entries.push(response.data)
    }

    resetForm()
  }

  const updateEntry = async (entry: CreateEntry) => {
    isLoading = true
    const response = await api.post(`entry/${selectedEntryId}`, entry)

    if (response.status === 201) {
      dataEntries.entries = dataEntries.entries.map(entry => {
        if (entry._id === selectedEntryId) {
          return response.data
        }
        return entry
      })
    }
    resetForm()
  }

  const resetForm = () => {
    isLoading = false
    showModal = false
    dataEntries.entry.emoji = ''
    dataEntries.entry.note = ''
  }

  const handleUpdate = ({ _id, emoji, note }: Entry) => {
    selectedEntryId = _id
    modalType = 'update'
    dataEntries.entry.emoji = emoji
    dataEntries.entry.note = note
    showModal = true
  }

  const handleDelete = async (id: string) => {
    const response = await api.delete(`entry/${id}`)
    if (response.status === 200) {
      dataEntries.entries = dataEntries.entries.filter(entry => entry._id !== id)
    }
    showModal = false
  }

  onMount(() => {
    fetchEntries()
    setCurrentDate()
  })
</script>

<section class="flex items-center h-dvh">
  <nav class="w-full h-16 bg-gray-900 fixed top-0 flex items-center px-10">
    <h1 class="text-lg text-white">
      Mood Tracker ❣️
    </h1>
  </nav>
  <div class="max-w-3xl mx-auto w-full">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <h1 class="text-4xl">{dateInfo.day}</h1>
        <p class="leading-5">
          <span class="block">{dateInfo.month}</span>
          <span>{dateInfo.year}</span>
        </p>
      </div>
      <p class="uppercase text-gray-500">{dateInfo.weekday}</p>
    </div>
    {#if dataEntries.entries.length > 0}
      <div class="flex justify-end my-3">
        <Button variant="outline" label="Add Entry" onclick={showAddEntry} />
      </div>
    {/if}
    <ul class="mt-4 gap-2 flex flex-col" use:autoAnimate>
      {#each dataEntries.entries as entry}
        <EntryList entry={entry} onDelete={() => handleDelete(entry._id)} onUpdate={() => handleUpdate(entry)}/>
      {:else}
        <div class="mt-20 flex flex-col justify-center items-center">
          <Button label="Add Entry" onclick={() => showModal = true} />
          <p class="text-center text-gray-600 text-lg mt-3">Uh oh! No entries added 🙁</p>
        </div>
      {/each}
    </ul>
  </div>

  {#if showModal}
    <EntryModal close={() => showModal = false} handleSuccess={modalType === 'add' ? saveEntry : updateEntry} loading={isLoading} modalType={modalType} />
  {/if}
</section>
