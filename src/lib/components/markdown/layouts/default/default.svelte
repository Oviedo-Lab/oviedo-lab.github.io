<script lang="ts">
    import './default.css';
	import type { Snippet } from 'svelte';
    
    let { children } = $props();
</script>


<article class="pt-8 pb-16 md:pb-20 h-fit w-full">
    <div data-slot="markdown-content" class="h-full w-auto mx-auto px-4 md:px-8">
        {@render children?.()}
    </div>
</article>