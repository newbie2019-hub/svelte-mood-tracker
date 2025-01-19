<script lang="ts">
  import { emojiUrl } from '$lib/emoji.ts'

  interface Props {
    emoji: string;
  }

  let { emoji }: Props = $props()
</script>

<div class="flex gap-3 items-center justify-center">
  <picture>
    <source srcset={emojiUrl(emoji)} type="image/webp">
    <img src={emojiUrl(emoji)} alt={"emoji"} width="40" height="40">
  </picture>
</div>
