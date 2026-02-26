<script lang="ts" module>
    export const technToolsModules: { content: Record<string, { default: any }> | null } = $state({
        content: null
    });
    
    technToolsModules.content = import.meta.glob(
        [
            "$content/tech-n-tools/**/*.{svx,md}",
            "!$content/tech-n-tools/**/README*", // ignore any README files
            "!$content/tech-n-tools/**/_template/**", // ignore any _template folder
        ],
        { eager: true },
    ) as Record<string, { default: any }>;
</script>

<script lang="ts">
    import * as Item from "$lib/components/ui/item/index.js";
    import { Images, ImageDown } from "@lucide/svelte/icons";

    import Badge from "$src/lib/components/ui/badge/badge.svelte";
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';
    dayjs.extend(relativeTime);

	let { data } = $props();

    const contents = $derived(data.content);
</script>


<svelte:head>
	<title>Tech and Tools - Oviedo Lab</title>
	<meta name="description" content="Technologies and tools developed by the Oviedo Lab" />

	<meta property="og:title" content="Tech and Tools - Oviedo Lab" />
	<meta property="og:description" content="Technologies and tools developed by the Oviedo Lab" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org/tech-n-tools/" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Tech and Tools - Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Tech and Tools - Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Tech and Tools - Oviedo Lab">
	<meta name="twitter:description" content="Technologies and tools developed by the Oviedo Lab">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Tech and Tools - Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org/tech-n-tools/">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, technology, tech and tools, tools, creation, projects, demo, research" />
</svelte:head>


<main class="flex flex-col items-center justify-start pt-10 sm:pt-10">
	<h1 class="text-center! text-4xl! font-bold! text-foreground!">
        <span class="block sm:hidden">
            Tech & Tools
        </span>
        <span class="hidden sm:block">
            Technologies and Tools
        </span>
    </h1>

    <div class="w-full min-h-fit px-4 py-10 md:px-10 lg:px-12 2xl:px-16 grid gap-x-4 gap-y-4 grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(26rem,1fr))] mx-2 sm:mx-8">
        {#each contents as content, i}
            <article class="w-full max-w-[calc(100vw-(var(--spacing)*4*2))] h-full rounded-lg border bg-card overflow-clip isolate">
                <a href={`/tech-n-tools/${content.slug}`} class="w-full h-full block" aria-label={`Read more about ${content.title}`} title={content.title}>
                    <Item.Root class="w-full h-full p-0 m-0 bg-card rounded-lg overflow-clip flex flex-col flex-nowrap gap-0 items-stretch justify-start">
                        {#if content.thumbnail}
                            <Item.Media class="relative w-full h-auto aspect-video p-0 m-0 bg-accent">
                                <ImageDown class="size-1/4 select-none text-muted-foreground animate-bounce absolute top-1/2 left-1/2 -translate-1/2" />
                                <enhanced:img src="{content.thumbnail}" alt={content.thumbnailAlt} class="absolute top-0 left-0 z-10 min-w-full w-full h-auto aspect-video object-cover object-center select-none bg-transparent"  sizes="(max-width: 480px) 400px, (max-width: 768px) 640px, (max-width: 1400px) 1280px" fetchpriority={i<5 ? "high" : "low"} referrerpolicy="no-referrer-when-downgrade" />
                            </Item.Media>
                        {:else}
                            <Item.Media class="w-full h-auto aspect-video bg-accent">
                                <Images class="size-1/4 select-none" />
                            </Item.Media>
                        {/if}
                        <div class="w-full h-auto flex-1 px-4 py-3 flex flex-col gap-2 items-start justify-start">
                            <Item.Header class="w-full h-fit shrink-0 basis-auto flex-none text-start align-top">
                                <h2 class="w-full font-semibold text-lg">
                                    {@html content.titleHtml ? content.titleHtml : content.title}
                                </h2>
                            </Item.Header>
                            <Item.Content class="w-full min-h-fit flex-1 text-start">
                                {#if content.description}
                                <!-- Wrap, break words, clamp to 4 lines -->
                                <p class="w-full min-h-fit flex-1 wrap-break-word text-base text-accent-foreground/80 line-clamp-4">
                                    {@html content.description}
                                </p>
                                {/if}
                                {#if content.authors && content.authors.length > 0}
                                    {@const dayText = content.yyyymmdd ? ` • ${dayjs().to(dayjs(content.yyyymmdd, "YYYYMMDD"))}` : ""}
                                    <!-- First author only -->
                                    <p class="mt-2 mr-1 text-sm text-muted-foreground w-full text-right">
                                        {content.authors[0]}{dayText}
                                    </p>
                                {/if}
                            </Item.Content>
                        </div>
                        <Item.Footer class="w-full h-fit px-4 pb-4 shrink-0 basis-auto flex-none flex flex-col gap-0 items-start justify-start">
                            {#if content.tags && content.tags.length > 0}
                                <div class="mt-3 w-full h-fit flex flex-wrap gap-2 items-center justify-center">
                                    {#each content.tags as tag}
                                        <Badge variant="outline" class="px-2.5 py-2">
                                            <span class="text-sm span-clip text-muted-foreground font-semibold">{tag}</span>
                                        </Badge>
                                    {/each}
                                </div>
                            {/if}
                        </Item.Footer>
                    </Item.Root>
                </a>
            </article>
        {/each}
    </div>

</main>


<style lang="postcss">
	.span-clip::before {
		content: '';
		display: table;
		margin-bottom: -0.38em !important;
	}
	.span-clip::after {
		content: '';
		display: table;
		margin-top: -0.30em !important;
	}
</style>