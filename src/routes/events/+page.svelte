<script lang="ts">
	import { Images, CalendarFold } from "@lucide/svelte/icons";

	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import * as Tabs from "$lib/components/ui/tabs";

	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import Masonry from 'svelte-bricks'
	import { ResizeSensor } from 'css-element-queries';

	interface MasonryItem {
		sources: any;
		img: any;
		id: string;
		alt: string;
	}

	let { data } = $props();

	const masonryImages: MasonryItem[] = $derived(data.imagesSorted);
	let masonryItems = $derived(masonryImages);

	let [masonryMinColWidth, masonryMaxColWidth, masonryGap] = [400, 1280, 16];
	// let masonryWidth: number, masonryHeight: number;
	let masonryWidth: number = $state(0), masonryHeight: number = $state(0);

	function correctMasonryHeight() {
		const eventGalleryContainer = document.querySelector('#event-gallery') as HTMLElement;
		// Select the child div with the class masonry
		const masonryContainer = eventGalleryContainer?.querySelector('.masonry') as HTMLElement;
		const computedStyle = window.getComputedStyle(masonryContainer);
		const margin = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
		const fullHeight = Math.ceil(masonryContainer.offsetHeight + margin);
		eventGalleryContainer.style.height = `${fullHeight}px`;
	}

	function handleMasonryResize() {
		// Fastest response when the masonry container is resized, best for when page loads
		// Not really working well when the page is resize-spammed after loaded
		const eventGalleryContainer = document.querySelector('#event-gallery') as HTMLElement;
		const masonryContainer = eventGalleryContainer?.querySelector('.masonry') as HTMLElement;
		if (masonryContainer) {
			new ResizeSensor(masonryContainer, () => {
				correctMasonryHeight();
			});
		}

		// Fallback in case the ResizeSensor doesn't work:
		// There is no callback to know when the masonry container is fully rendered --> setTimeout
		correctMasonryHeight();
		setTimeout(() => {
			correctMasonryHeight();
		}, 500);
		setTimeout(() => {
			correctMasonryHeight();
		}, 1000);
		setTimeout(() => {
			correctMasonryHeight();
		}, 1500);
		setTimeout(() => {
			correctMasonryHeight();
		}, 5000);
		setTimeout(() => {
			correctMasonryHeight();
		}, 10000);

		// Add event listener for window resize
		window.addEventListener('resize', () => {
			correctMasonryHeight();
			setTimeout(() => {
				correctMasonryHeight();
			}, 500);
			setTimeout(() => {
				correctMasonryHeight();
			}, 1000);
			setTimeout(() => {
				correctMasonryHeight();
			}, 1500);
			setTimeout(() => {
				correctMasonryHeight();
			}, 2500);
			setTimeout(() => {
				correctMasonryHeight();
			}, 10000);
		});
	}


	// On mount, find the actual height of the masonry container and set it as the height of the tab content
	onMount(() => {
		handleMasonryResize();
	});

</script>


<svelte:head>
	<title>Lab Events - Oviedo Lab</title>
	<meta name="description" content="Work hard, play hard! Here are the fun times we spent together ~" />

	<meta property="og:title" content="Lab Events - Oviedo Lab" />
	<meta property="og:description" content="Work hard, play hard! Here are the fun times we spent together ~" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org/events/" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Lab Events - Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Lab Events - Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Lab Events - Oviedo Lab">
	<meta name="twitter:description" content="Work hard, play hard! Here are the fun times we spent together ~">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Lab Events - Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org/events/">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, team, members, events, outing, social, play, fun, gathering, extracurricular, activities" />
</svelte:head>


<main class="flex h-full flex-col items-center justify-start">
	<h1 class="sr-only">Lab Events</h1>

	<!-- Change the value of Root.value to change the default active tab -->
	<Tabs.Root value="gallery" class="w-full h-full grow flex flex-col items-center justify-start gap-6 pt-6 sm:pt-10 bg-stone dark:bg-stone-900">
		<Tabs.List class="h-fit p-1.5">
			<Tabs.Trigger value="gallery" class="px-7 sm:px-8 text-md font-semibold md:text-base md:px-12">
				<Images class="size-5 mr-2" /> <span class="mr-2.5">Gallery</span>
			</Tabs.Trigger>
			<Tabs.Trigger value="timeline" class="px-7 sm:px-8 text-md font-semibold md:text-base md:px-12">
				<CalendarFold class="size-5 mr-2" /> <span class="mr-2.5">Timeline</span>
			</Tabs.Trigger>

			<!-- Add more tabs header here -->
		</Tabs.List>

		<!-- Masonry Gallery -->
		{#if !browser}
			<div class="flex w-full h-full grow px-4 md:px-8 lg:px-16 pb-6 sm:pb-10">
				<Skeleton class="grow w-auto h-full" />
			</div>
		{:else}
			<Tabs.Content value="gallery" class="relative w-full h-full min-h-max grow bg-stone dark:bg-stone-900" id="event-gallery">
				<Masonry
					items={masonryItems}
					minColWidth={masonryMinColWidth}
					maxColWidth={masonryMaxColWidth}
					gap={masonryGap}
					bind:masonryWidth={masonryWidth}
					bind:masonryHeight={masonryHeight}
					class="absolute w-full h-max top-0 left-0 px-4 md:px-8 lg:px-16 pb-6 sm:pb-10 bg-stone dark:bg-stone-900"
				>
					{#snippet children({ item })}
						<enhanced:img src="{item}" alt={item.alt} class="w-full h-full rounded-md object-cover object-center bg-stone-300 dark:bg-stone-800 select-none" sizes="min({masonryMaxColWidth*1.5}px, 100vw)" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
					{/snippet}
				</Masonry>
			</Tabs.Content>


			<!-- Timeline View -->
			{#if !browser}
				<Tabs.Content value="timeline" class="relative w-full h-full grow">
					<div class="absolute w-full h-full top-0 left-0 px-4 sm:px-6 md:px-10 lg:px-32 pb-6 sm:pb-10">
						<Skeleton class="h-full w-full" />
					</div>
				</Tabs.Content>
			{:else}
				<Tabs.Content value="timeline" class="relative w-full h-full grow">
					<div class="flex flex-col items-center justify-center pb-6 sm:pb-10 gap-6 sm:gap-10 bg-stone dark:bg-stone-900">
						<!-- Individual Articles for each data.timeline item -->
						{#each data.timeline as item, index}
							<article class="w-full h-full flex flex-col items-center justify-center my-4">
								<div class="w-full mb-6">
									<h2 class="text-left text-3xl font-bold text-foreground ml-12 mb-2 pb-2 border-b border-stone-500 dark:border-stone-300 break-normal whitespace-pre-wrap overflow-hidden text-wrap lg:text-4xl">{item.yearMonth}</h2>

									{#if item.caption}
										<p class="text-left text-md text-muted-foreground my-3 mx-12 break-normal whitespace-pre-wrap overflow-hidden text-wrap lg:text-xl">{item.caption}</p>
									{/if}
								</div>
								<div class="w-full h-full flex flex-col items-center justify-center lg:items-start">
									<!-- Show the image carousel on small screens -->
									<Carousel.Root class="w-[70%] sm:w-[78%] md:w-[82%] lg:hidden">
										<!-- Image Carousel -->
										<Carousel.Content>
											{#each item.images as image}
												<Carousel.Item class="basis sm:basis-1/2">
													<div class="w-full h-full flex flex-col items-center justify-center">
														<enhanced:img src="{image}" alt={image.alt} class="w-full h-full rounded-md object-cover object-center bg-stone-300 dark:bg-stone-800 select-none" sizes="100vw" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
													</div>
												</Carousel.Item>
											{/each}
										</Carousel.Content>
	
										{#if item.images.length > 1}
											<Carousel.Previous />
											<Carousel.Next />
										{/if}
									</Carousel.Root>

									<!-- Show flex row wrap on larger screens -->
									<div class="mx-12 hidden lg:flex flex-row flex-wrap gap-4 after:content-[''] after:grow-999">
										{#each item.images as image}
											<!-- Show 4 images per row but fill the row with images (increase image width to fill the row) -->
											<div class="h-80 flex-auto">
												<enhanced:img src="{image}" alt={image.alt} class="w-full h-full rounded-md object-cover object-center bg-stone-300 dark:bg-stone-800 select-none" sizes="70vw" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
											</div>
										{/each}
									</div>
								</div>
							</article>
						{/each}
					</div>
				</Tabs.Content>
			{/if}

			<!-- Add more tabs content here -->

		{/if}
	</Tabs.Root>

</main>