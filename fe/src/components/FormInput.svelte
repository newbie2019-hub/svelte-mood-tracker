<script lang="ts">
  let { value = $bindable(), placeholder, ...rest } = $props()
</script>

<textarea placeholder={placeholder} bind:value={value} class="w-full rounded-md placeholder:text-sm" {...rest}></textarea>