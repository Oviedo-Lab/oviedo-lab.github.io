<script lang="ts">
	import '../app.css';

	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from '$lib/components/ui/sonner';
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { toast } from 'svelte-sonner';


	import Navigation from '$lib/blocks/navigation/navigation.svelte';


	let { children } = $props();
</script>

<svelte:head>
	<title>Oviedo Lab</title>
	<meta name="description" content="We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents" />

	<meta property="og:title" content="Oviedo Lab" />
	<meta property="og:description" content="We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Oviedo Lab">
	<meta name="twitter:description" content="We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents.">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell" />
</svelte:head>


<!-- Global Utils -->
<ModeWatcher />
<Toaster />



<!-- Page Layout -->
<Tooltip.Provider delayDuration={300} skipDelayDuration={150}>
<div class="min-h-screen h-full w-full">
	<header class="h-14 w-full fixed top-0 left-0 z-9999999 overflow-clip isolate">
		<div class="absolute top-0 left-0 h-[200%] w-full bg-background/75 dark:bg-background/60 backdrop-blur-2xl select-none pointer-events-none">
			<!-- backdrop blur container -->
		</div>
		<Navigation
			class="absolute top-0 left-0 h-full w-full" 
		/>

	</header>

	<div class="h-full w-full pt-14">
		{@render children()}
	</div>
</div>
</Tooltip.Provider>