<script lang="ts">
    let { children } = $props();
</script>


<div data-slot="markdown-content">
    {@render children?.()}
</div>