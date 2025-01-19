<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

  type ButtonType = 'primary' | 'secondary' | 'error' | 'success' | 'outline'

  type Button = {
    children?: Snippet
    label: string
    variant?: ButtonType
    block?: boolean
    loading?: boolean
  } & HTMLButtonAttributes

  const btnTypeClass: Record<ButtonType, string> = {
    'primary': 'bg-blue-700 hover:bg-blue-600 active:bg-blue-700 text-white disabled:bg-blue-500 disabled:cursor-progress',
    'secondary': 'bg-gray-300 hover:bg-gray-200 active:bg-gray-300',
    'error': '',
    'outline': 'bg-gray-200 hover:bg-gray-100 disabled:bg-gray-100',
    'success': '',
  }

  let { children, label, variant = 'primary', block, loading, ...rest }: Button  = $props()

  const defaultClass = 'duration-200 transition-all px-5 py-2.5 rounded-md'

  const fullWidth = 'block w-full'

  const dynamicClass = $derived(btnTypeClass[variant])
</script>

<button class={[defaultClass, dynamicClass, block ? fullWidth : '']} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <div class="flex items-center justify-center gap-x-2">
      {#if loading}
        <svg class="animate-spin size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      {/if}
      {label}
    </div>
  {/if}
</button>