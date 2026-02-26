<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from "$lib/components/ui/separator";
	import { page } from "$app/state";

	let { data } = $props();

	const images: any = import.meta.glob(
		['$content/team/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'],
		{
			eager: true,
			query: { enhanced: true }
		}
	);

	export function getFullImagePath(path: string) {
		if (!path) {
            return "##";
        }

        // the path could be an external url
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        // if path is undefined, return the default path
        if (!images[path]) {
            return "##";
        }

		return images[path].default || "";
	}

</script>


<svelte:head>
	<title>Team Members - Oviedo Lab</title>
	<meta name="description" content="Current and past members at Oviedo Lab" />

	<meta property="og:title" content="Team Members - Oviedo Lab" />
	<meta property="og:description" content="Current and past members at Oviedo Lab" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org/team/" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Team Members - Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Team Members - Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Team Members - Oviedo Lab">
	<meta name="twitter:description" content="Current and past members at Oviedo Lab">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Team Members - Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org/team/">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, team, members, current, past, alumni" />
</svelte:head>


<main class="flex flex-col items-center justify-start pt-10 pb-11 sm:pt-10 sm:pb-11 gap-6 sm:gap-10">
	<h1 class="sr-only">Lab's Members</h1>
	
	<!-- Current team members -->
	<section class="max-w-full w-[96vw] flex flex-col items-center justify-start gap-6 mb-2 sm:gap-10">
		<h2 class="text-center text-3xl font-bold text-foreground sm:text-4xl">
			Current Team
		</h2>
		
		<div class="max-w-full w-[95%] pt-3 pb-5 flex flex-col items-center justify-start gap-6 sm:flex-row sm:flex-wrap sm:gap-8 sm:justify-center">

			{#each data.team as member}
				{#if !member.isAlumni}

				<Button variant="outline" class="w-fit h-fit max-w-full rounded-lg bg-muted/40" href={`${page.route.id}/${member.name.replace(/\s/g, '')}`}>
					<div class="flex flex-col items-center justify-start gap-2 px-1 h-fit w-[24rem] max-w-[99vw]" role="button">
						<Avatar.Root class="size-44 rounded-full mt-2 sm:mt-4 sm:size-52 md:size-52 lg:size-56">
							<!-- Validate that the image exists and the return type from fullImagePath is a string !="##" -->
							{#if member.images.length === 0}
								<Avatar.Fallback class="text-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl">{member.initials}</Avatar.Fallback>
							{:else}
								<picture>
									<source srcset={getFullImagePath(member.images[0]).sources.avif} type="image/avif" />
									<source srcset={getFullImagePath(member.images[0]).sources.webp} type="image/webp" />
									<source srcset={getFullImagePath(member.images[0]).sources.png} type="image/png" />
									<Avatar.Image src={getFullImagePath(member.images[0]).img.src} alt="{member.name} headshot" class="rounded-full object-cover" />
								</picture>
								<Avatar.Fallback class="text-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl">{member.initials}</Avatar.Fallback>
							{/if}
						</Avatar.Root>
						<div class="flex flex-col items-start justify-center gap-1 max-w-full">
							<h3 class="text-ellipsis whitespace-nowrap overflow-hidden max-w-full text-2xl font-bold text-foreground mx-auto text-center my-1 mt-2 sm:mt-2 md:text-2xl lg:text-3xl">{member.name}</h3>
							<p class="text-ellipsis whitespace-nowrap overflow-hidden text-sm text-foreground mx-auto text-center mb-1 sm:mb-4 md:text-md lg:text-lg">{member.title}</p>
						</div>
					</div>
				</Button>

				{/if}
			{/each}

		</div>
	</section>


	<Separator class="my-6" />


	<!-- Past team members -->
	<section class="max-w-full w-[96vw] flex flex-col items-center justify-start gap-6 mb-2 sm:gap-10">
		<h2 class="text-center text-3xl font-bold text-foreground sm:text-4xl">
			Alumni
		</h2>

		<!-- For alumni, show only the name and title without the image -->
		<div class="max-w-full w-[92%] sm:w-[85%] pt-3 pb-5 flex flex-col items-center justify-start gap-6 sm:flex-row sm:flex-wrap sm:gap-8 sm:justify-center">
			{#each data.team as member}
				{#if member.isAlumni}
				<Button variant="outline" class="w-fit h-fit max-w-full rounded-lg" href={`${page.route.id}/${member.name.replace(/\s/g, '')}`}>
					<div class="flex flex-col items-start justify-center gap-1 max-w-full">
						<h3 class="text-ellipsis whitespace-nowrap overflow-hidden max-w-full text-xl font-bold text-foreground mx-auto text-center mt-2 sm:mt-2 md:text-xl lg:text-2xl">{member.name}</h3>
						<p class="text-ellipsis whitespace-nowrap overflow-hidden text-sm text-foreground mx-auto text-center mb-1 sm:mb-4 md:text-md lg:text-lg">{member.title}</p>
					</div>
				</Button>
				{/if}
			{/each}
		</div>

	</section>

</main>