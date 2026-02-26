<script lang="ts">
    import { cn } from "$src/lib/utils.js";
    import { technToolsModules } from "../+page.svelte";

	let { data } = $props();
    const contentMetadata = $derived(data.content);
    
    // find the content that matches the current page's slug
    const contentComponent = $derived.by(() => {
        if (!contentMetadata) return null;
        if (!technToolsModules.content) return null;
        const currentSrc = contentMetadata.src;
        const matchingContent = technToolsModules.content[currentSrc];
        return matchingContent ? matchingContent : null;
    });

</script>

<svelte:head>
	<title>{contentMetadata?.title ? `${contentMetadata.title} - Tech and Tools - Oviedo Lab` : "Tech and Tools - Oviedo Lab"}</title>
	<meta name="description" content={contentMetadata?.description ?? "Technologies and tools developed by the Oviedo Lab"} />

	<meta property="og:title" content={contentMetadata?.title ? `${contentMetadata.title} - Tech and Tools - Oviedo Lab` : "Tech and Tools - Oviedo Lab"} />
	<meta property="og:description" content={contentMetadata?.description ?? "Technologies and tools developed by the Oviedo Lab"} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://oviedolab.org/tech-n-tools/${contentMetadata?.slug ? contentMetadata.slug + "/" : ""}`} />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content={contentMetadata?.title ? `${contentMetadata.title} - Tech and Tools - Oviedo Lab` : "Tech and Tools - Oviedo Lab"} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content={contentMetadata?.title ? `${contentMetadata.title} - Tech and Tools - Oviedo Lab` : "Tech and Tools - Oviedo Lab"} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content={contentMetadata?.title ? `${contentMetadata.title} - Tech and Tools - Oviedo Lab` : "Tech and Tools - Oviedo Lab"}>
	<meta name="twitter:description" content={contentMetadata?.description ?? "Technologies and tools developed by the Oviedo Lab"}>
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content={contentMetadata?.title ? `${contentMetadata.title} - Tech and Tools - Oviedo Lab` : "Tech and Tools - Oviedo Lab"}>
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content={`https://oviedolab.org/tech-n-tools/${contentMetadata?.slug ? contentMetadata.slug + "/" : ""}`}>

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, technology, tech and tools, tools, creation, projects, demo, research" />
</svelte:head>

<main class={cn("relative w-full h-full p-0")}>
    {#if contentComponent}
        {@const Component = contentComponent.default}
        <Component />  
    {:else}
        <p class="text-muted-foreground text-lg">Loading...</p>
    {/if}

</main>