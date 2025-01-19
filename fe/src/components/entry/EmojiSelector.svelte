<script lang="ts">
  import { emojiList, emojiUrl } from '$lib/emoji.ts'

  interface Props {
    value: string;
    setEmoji: (emoji: string) => void
  }

  let { value, setEmoji }: Props = $props()
</script>

<div class="flex gap-3 items-center justify-center my-4">
  {#each emojiList as emoji}
    <button onclick={() => setEmoji(emoji)} class="flex items-center justify-center">
      <picture class={['picture-hover cursor-pointer', value === emoji ? 'selected' : '']}>
        <source srcset={emojiUrl(emoji)} type="image/webp">
        <img src={emojiUrl(emoji)} alt={"emoji"} width="62" height="62">
      </picture>
    </button>
  {/each}
</div>

<style>
  .picture-hover {
    @apply relative before:hidden hover:before:block before:content-[''] before:absolute before:-bottom-2 before:h-6 before:w-full before:bg-blue-700/60 before:rounded-md before:blur-lg;

    &::before {
      transform: perspective(100px) rotateX(60deg); /* Tilts the element almost flat */
      transform-origin: center bottom; /* Makes the bottom edge the pivot point */
    }
  }

  .selected {
    @apply before:!block
  }
</style>
