<script lang="ts">
    import '../default/default.css';
    
    import dayjs from 'dayjs';
    import { Separator } from "$lib/components/ui/separator/index.js";

    let { children, ...metadata } = $props();
    const contentMetadata = $derived(metadata);

    const firstAuthor = $derived.by(() => {
        if (!contentMetadata) return null;
        if (!contentMetadata.authors || contentMetadata.authors.length === 0) return null;
        return contentMetadata.authors[0];
    });
    const modDateShortMonth = $derived.by(() => {
        if (!contentMetadata) return null;
        if (!contentMetadata.yyyymmdd) return null;
        // Format as "MMM D, YYYY"
        return dayjs(String(contentMetadata.yyyymmdd), "YYYYMMDD").format("MMM D, YYYY");
    });
</script>


<article class="pt-1 sm:pt-4 md:pt-8 pb-16 md:pb-20 h-fit w-full">
    <div data-slot="markdown-content" class="h-full w-auto mx-auto px-4 md:px-8">
        {@render children?.()}

        <Separator class="my-4 bg-border" />
        <div class="w-full h-fit flex flex-row items-center justify-between gap-4 mb-1">
            {#if modDateShortMonth}
                <span class="text-sm text-muted-foreground"><i>Last Updated:</i> {modDateShortMonth}</span>
            {/if}
            {#if firstAuthor}
                <span class="text-sm text-muted-foreground">by {firstAuthor}</span>
            {/if}
        </div>
    </div>
    
        
</article>