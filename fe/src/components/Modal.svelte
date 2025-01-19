<script lang="ts">
  import { type Snippet } from "svelte";

  let { children, containerClass }: { children: Snippet, containerClass?: string } = $props()
</script>

<div class="fixed inset-0 transition-all duration-100">
  <div class="bg-gray-600/40 w-full h-dvh"></div>
  <div class={['absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md', containerClass]}>
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>