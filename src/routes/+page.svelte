<script lang="ts">
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { Button } from "$lib/components/ui/button";
    import * as Carousel from "$lib/components/ui/carousel/index.js";


    import {
        MoveRight,
    } from "@lucide/svelte/icons";

    import { browser } from "$app/environment";


	import AlstonVideoCentered from '$lib/assets/home/alston_centered.mp4';
	import ActivityMappingVideo01 from "$lib/assets/research/ActivityMapping/2024_sweep_vocal_movie.mp4";
	import BehaviorVideo01 from "$lib/assets/research/Behavior/2024_pup-retrieval-recording_01.mp4";

    import Merck from "$lib/assets/research/Sponsors/Merck.svg";
    import NSFCareerAwards from "$lib/assets/research/Sponsors/NSFCareerAwards.svg";


    function convertRemToPixels(rem: number) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}
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



<main class="">
    <div
    id="landing-hero"
	class="relative hero isolate content-center bg-stone-800 dark"
    >
        <!-- Skeleton placeholder for the image in the extreme scenario -->
        <div class="absolute -z-20 w-full h-full top-0 left-0 overflow-clip flex items-center justify-center">
            <Skeleton class="h-full w-screen bg-stone-900" />
        </div>

        <!-- This optimized image will load first, placeholder for the video -->
        <div class="absolute -z-20 w-full h-full top-0 left-0 overflow-clip flex items-center justify-center">
			<enhanced:img src='$lib/assets/home/alston_preview_centered.png' alt="Alston mouse in the Monteverde Rainforest" class="hero-media w-screen object-center bg-no-repeat bg-center bg-cover scale-105 blur-lg opacity-30 brightness-60 saturate-90 select-none" fetchpriority="high" loading="eager" />
        </div>

        <!-- The video background -->
        <div class="absolute -z-20 w-full h-full top-0 left-0 bg-stone-800 overflow-clip flex items-center justify-center">
			<video src={AlstonVideoCentered} autoplay loop muted playsinline class="hero-media w-screen object-center object-cover bg-no-repeat bg-center bg-cover bg-stone-800 scale-105 blur-[5px] opacity-50 brightness-[0.50] select-none"></video>
            <span class="sr-only">Background video of Alston mouse in the Monteverde Rainforest</span>
        </div>

        <div class="absolute h-full w-full top-0 left-0 flex flex-col items-center justify-center gap-6 sm:gap-7 center">
            <p class="text-center text-lg font-semibold text-muted-foreground sm:text-xl drop-shadow-xl">
                WashU Neuroscience
            </p>
            <h1 class="text-center text-5xl text-foreground font-bold sm:text-6xl drop-shadow-lg">Oviedo Lab</h1>
            <p class="mt-2 text-center text-lg font-semibold text-foreground sm:text-xl drop-shadow-lg">
                Decoding Vocal Communication
            </p>
            <!-- On click, smooth scroll to the research focus section -->
            <Button class="my-6 p-6 text-lg font-semibold drop-shadow-lg" id="learnmore-button" onclick={() => window.scrollTo({ top: ((document.getElementById('research-focus')?.offsetTop || 0) - convertRemToPixels(3)), behavior: 'smooth' })}>
                Learn More
                <span id="learnmore-arrow" class="visuallyhidden hidden spin-arrow arrow-rotate-down">
                    <MoveRight class="h-4 w-4 ml-3" />
                </span>
            </Button>
        </div>

        <div class="absolute bottom-0 flex flex-col items-end justify-center w-full">
            <p class="text-center text-[0.52rem] sm:text-xs text-muted-foreground/60 m-2 blur-[0.2px]">
                Video: Alston mouse in the Monteverde Rainforest (Credit: H.V. Oviedo)
            </p>
        </div>
    </div>


    <section
        id="research-focus"
        class="relative scroll-m-8 flex flex-col items-center justify-center gap-6 bg-card pt-16 pb-18 md:pt-18 md:pb-22"
    >
        <h2 class="text-center text-3xl font-bold text-foreground mb-2">Research Focus</h2>
        <p class="mx-auto max-w-prose lg:max-w-[78ch] 2xl:max-w-[90ch] px-6 sm:px-10 text-lg text-foreground">
            Animals rely on sounds for survival, and social/reproductive interactions. Our brain must perform the challenging tasks of rapidly recognizing, categorizing, and assigning communicative importance to sounds in a noisy environment. The instructions to these functions are found in the precise connections neurons make with one another. We study evolutionarily conserved mechanisms for decoding social calls in the Auditory Cortex of rodents. The organization of the cerebral cortex may appear stereotyped, but new tools that allow detailed investigation of neural circuits have revealed significant differences between cortical areas that perform different functions. These circuit specializations embedded in stereotyped modules are now believed to be the secret ingredients that enable cortical areas to perform specific tasks. Our goal is to reveal these unique circuit features in the Auditory Cortex and determine their behavioral significance.
        </p>
    </section>

    <section
        id="technologies"
        class="scroll-m-8 flex flex-col items-center justify-start md:justify-center gap-6 bg-stone-200 pt-16 pb-16 md:pt-18 md:pb-18 dark:bg-stone-800 md:relative"
    >
        <h2 class="text-center text-3xl font-bold text-foreground">Technologies</h2>

        <div
			class="mt-6 flex w-full flex-col items-center justify-start gap-6 rounded-lg py-10 pt-0 sm:mt-8 sm:gap-10"
		>
			<!-- Transcriptomics -->
			<article id="transcriptomics" class="w-full flex flex-col items-center justify-start scroll-mt-20">
				<div class="shadow-stone-800/5 dark:shadow-stone-200/5 shadow-lg flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-border bg-card py-12 pt-8 sm:pt-12 sm:w-[40rem] sm:gap-10 md:w-[44rem] lg:w-[66rem] lg:max-w-[90%]">
					<!-- Carousel for research images on the left, Title + Text description on the right (and swap order even/odd to make easier to read) -->
					<!-- On small screens, the content stacked vertically, Title -> Images -> Text -->
					<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
						<h2 class="text-center text-2xl font-bold text-foreground mt-1.5 mx-auto lg:hidden">
							Transcriptomics
						</h2>
	
						<!-- Carousel Div -->
						<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-1">
							<Carousel.Root class="w-[75%] h-full my-6 max-w-base lg:my-0">
								<Carousel.Content>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											<enhanced:img src="$lib/assets/research/MERFISH/2024_ACxDevP18CBACAJ_LayersROI_01.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
										</div>
									</Carousel.Item>
									
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											<enhanced:img src="$lib/assets/research/MERFISH/20240917_MERFISH_art1.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
										</div>
									</Carousel.Item>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											<enhanced:img src="$lib/assets/research/MERFISH/20240917_MERFISH_art2.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
										</div>
									</Carousel.Item>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											<enhanced:img src="$lib/assets/research/MERFISH/20240917_MERFISH_art3.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
										</div>
									</Carousel.Item>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											<enhanced:img src="$lib/assets/research/MERFISH/2024_ACxDevP18CBACAJ_LayersROI_02.png" alt="MERFISH Spatial Transcriptomics" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
										</div>
									</Carousel.Item>
	
									<!-- Add more images here -->
	
								</Carousel.Content>
								<Carousel.Previous />
								<Carousel.Next />
							</Carousel.Root>
						</div>
	
						<!-- Title + Description -->
						<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-2">
							<h2 class="hidden lg:block! text-center text-2xl font-bold text-foreground mx-auto mb-4">
								Transcriptomics
							</h2>
							<p class="text-md text-foreground mx-3 lg:mx-0">
								The mechanisms by which the auditory cortices develop unique sound processing capabilities remain unknown. Recent research conducted in our lab has indicated notable variations in the maturation trajectory of the auditory cortices. To gain insights into the molecular pathways responsible for these differences, we investigate changes in gene expression between the auditory cortices using spatial transcriptomics.
							</p>
						</div>
					</div>
				</div>
			</article>
	
	
			<!-- Circuit Mapping -->
			<article id="circuit-mapping" class="w-full flex flex-col items-center justify-start scroll-mt-20">
				<div class="shadow-stone-800/5 dark:shadow-stone-200/5 shadow-lg flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-border bg-card py-12 pt-8 sm:pt-12 sm:w-[40rem] sm:gap-10 md:w-[44rem] lg:w-[66rem] lg:max-w-[90%]">
					<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
						<h2 class="text-center text-2xl font-bold text-foreground mt-1.5 mx-auto lg:hidden">
							Circuit Mapping
						</h2>
	
						<!-- Carousel Div -->
						<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-2">
							<Carousel.Root class="w-[75%] h-full my-6 max-w-base lg:my-0">
								<Carousel.Content>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											<enhanced:img src="$lib/assets/research/CircuitMapping/2024_L6-circuit-mapping_01.png" alt="Cortical Layer 6 Circuit Mapping" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
										</div>
									</Carousel.Item>
	
									<!-- Add more images here -->
	
								</Carousel.Content>
								<Carousel.Previous />
								<Carousel.Next />
							</Carousel.Root>
						</div>
	
						<!-- Title + Description -->
						<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-1">
							<h2 class="hidden lg:block! text-center text-2xl font-bold text-foreground mx-auto mb-4">
								Circuit Mapping
							</h2>
							<p class="text-md text-foreground mx-3 lg:mx-0">
								Connectivity determines function in the brain. Therefore, to investigate the circuitry responsible for decoding sounds we use quantitative synaptic circuit analysis in vitro. Using this approach, we have uncovered distinct lateralized circuit motifs in the auditory cortices, adding mechanistic insight into the asymmetrical organization of auditory processing. We have also uncovered disrupted connectivity in mouse models of neuropsychiatric disorders, providing valuable insights into the underlying mechanisms contributing to these conditions.
							</p>
						</div>
					</div>
				</div>
			</article>
	
	
			<!-- High-Density In Vivo Electrophysiology -->
			<article id="invivo-electrophysiology" class="w-full flex flex-col items-center justify-start scroll-mt-20">
				<div class="shadow-stone-800/5 dark:shadow-stone-200/5 shadow-lg flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-border bg-card py-12 pt-8 sm:pt-12 sm:w-[40rem] sm:gap-10 md:w-[44rem] lg:w-[66rem] lg:max-w-[90%]">
					<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
						<h2 class="text-center text-2xl font-bold text-foreground mt-1.5 mx-auto lg:hidden">
							High-Density <i>In Vivo</i> Electrophysiology
						</h2>
	
						<!-- Carousel Div -->
						<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-1">
							<Carousel.Root class="w-[75%] h-full my-6 max-w-base lg:my-0">
								<Carousel.Content>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											<enhanced:img src="$lib/assets/research/Physiology/2024_probe-recording_cartoon.png" alt="High-density silicon probe recording cartoon" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
										</div>
									</Carousel.Item>
	
									<!-- Add more images here -->
	
								</Carousel.Content>
								<Carousel.Previous />
								<Carousel.Next />
							</Carousel.Root>
						</div>
	
						<!-- Title + Description -->
						<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-2">
							<h2 class="hidden lg:block! text-center text-2xl font-bold text-foreground mx-auto mb-4">
								High-Density <i>In Vivo</i> Electrophysiology
							</h2>
							<p class="text-md text-foreground mx-3 lg:mx-0">
								The process by which the auditory cortex combines spectro-temporal features to form auditory streams, such as a voice or a symphony, remains unknown. In our laboratory, we focus on unraveling the compositional nature of auditory representations and understanding how they can be disrupted in neuropsychiatric disorders. To achieve this, we employ high-density silicon probe recordings, enabling us to capture detailed neuronal activity patterns and decipher the intricate mechanisms underlying auditory perception.
							</p>
						</div>
					</div>
				</div>
			</article>
	
	
			<!-- Behavior -->
			<article id="behavior" class="w-full flex flex-col items-center justify-start scroll-mt-20">
				<div class="shadow-stone-800/5 dark:shadow-stone-200/5 shadow-lg flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-border bg-card py-12 pt-8 sm:pt-12 sm:w-[40rem] sm:gap-10 md:w-[44rem] lg:w-[66rem] lg:max-w-[90%]">
					<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
						<h2 class="text-center text-2xl font-bold text-foreground mt-1.5 mx-auto lg:hidden">
							Behavior
						</h2>
	
						<!-- Carousel Div -->
						<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-2">
							<Carousel.Root class="w-[75%] h-full my-6 max-w-base lg:my-0">
								<Carousel.Content>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											{#if !browser}
												<enhanced:img src="$lib/assets/research/Behavior/2024_pup-retrieval-recording_01.png" alt="Pup retrieval behavior recording" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" fetchpriority="low" />
											{:else}
												<div class="w-full h-full bg-stone-800 flex items-center justify-center rounded-md">
													<video src={BehaviorVideo01} preload="none" autoplay loop muted playsinline class="object-center object-contain bg-no-repeat bg-center bg-cover max-h-full max-w-full rounded-md bg-stone-800 select-none"></video>
													<span class="sr-only">Pup retrieval behavior recording</span>
												</div>
											{/if}
										</div>
									</Carousel.Item>
	
									<!-- Add more images here -->
	
								</Carousel.Content>
								<Carousel.Previous />
								<Carousel.Next />
							</Carousel.Root>
						</div>
	
						<!-- Title + Description -->
						<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-1">
							<h2 class="hidden lg:block! text-center text-2xl font-bold text-foreground mx-auto mb-4">
								Behavior
							</h2>
							<p class="text-md text-foreground mx-3 lg:mx-0">
								We utilize ethological behaviors to study the development of the auditory cortex’s role in responding to social calls, or vocalizations. Ethological behaviors are innate responses that are directly associated with an animal’s social interactions and communication. By observing and analyzing ethological behaviors, we gain insights into how the auditory cortex evolves and adapts in order to process and respond to social calls. We aim to uncover the underlying mechanisms that contribute to the development of auditory cortical circuits involved in the perception of social vocalizations.
							</p>
						</div>
					</div>
				</div>
			</article>
	
	
			<!-- Activity Mapping -->
			<article id="activity-mapping" class="w-full flex flex-col items-center justify-start scroll-m-20">
				<div class="shadow-stone-800/5 dark:shadow-stone-200/5 shadow-lg flex w-[99%] flex-col items-center justify-start gap-6 rounded-lg border-2 border-border bg-card py-12 pt-8 sm:pt-12 sm:w-[40rem] sm:gap-10 md:w-[44rem] lg:w-[66rem] lg:max-w-[90%]">
					<div class="w-[90%] flex flex-col items-start justify-start gap-2 mx-0 lg:flex-row lg:gap-4 lg:items-center lg:justify-between">
						<h2 class="text-center text-2xl font-bold text-foreground mt-1.5 mx-auto lg:hidden">
							Activity Mapping
						</h2>
	
						<!-- Carousel Div -->
						<div class="w-full flex flex-col items-center justify-start gap-2 lg:w-1/2 lg:order-1">
							<Carousel.Root class="w-[75%] h-full my-6 max-w-base lg:my-0">
								<Carousel.Content>
									<Carousel.Item>
										<div class="w-full h-full flex flex-col items-center justify-center">
											{#if !browser}
												<enhanced:img src="$lib/assets/research/ActivityMapping/2024_sweep_vocal_movie.png" alt="Brain activity mapping during sweep stimulus" class="w-full rounded-md object-cover object-center bg-card max-h-[45vh] max-w-[45vh] select-none" sizes="min(1920px, 90vw)" />
	
											{:else}
												<div class="w-full h-full bg-stone-800 flex items-center justify-center rounded-md">
													<video src={ActivityMappingVideo01} autoplay loop muted playsinline class="object-center object-contain bg-no-repeat bg-center bg-cover max-h-full max-w-full rounded-md bg-stone-800 select-none"></video>
													<span class="sr-only">Brain activity mapping during sweep stimulus</span>
												</div>
											{/if}
	
										</div>
									</Carousel.Item>
	
									<!-- Add more images here -->
	
								</Carousel.Content>
								<Carousel.Previous />
								<Carousel.Next />
							</Carousel.Root>
						</div>
	
						<!-- Title + Description -->
						<div class="lg:max-w-[45%] h-full flex flex-col items-start justify-center lg:self-start lg:gap-2 lg:order-2">
							<h2 class="hidden lg:block! text-center text-2xl font-bold text-foreground mx-auto mb-4">
								Activity Mapping
							</h2>
							<p class="text-md text-foreground mx-3 lg:mx-0">
								Brain-clearing techniques, combined with immunolabeling of immediate-early genes, enable high-throughput and unbiased 3D mapping of neuronal activity. We utilize cFos activity mapping to screen for deficits in sound-evoked responses in the central auditory system, allowing us to identify structures where auditory processing diverges from wildtype in neuropsychiatric mouse models
							</p>
						</div>
					</div>
				</div>
			</article>
		</div>
    </section>

    <section
        id="funding-sources"
        class="relative scroll-m-8 flex flex-col items-center justify-center gap-6 bg-card pt-16 pb-16 md:pt-20"
    >
        <h2 class="text-center text-3xl font-bold text-foreground mb-2 sm:mb-6">Funding Sources</h2>
		<div class="mx-auto p-6 sm:p-2 mb-2 flex flex-wrap gap-4 md:gap-6 items-center justify-center sm:w-[40rem] md:w-[48rem] lg:w-[72rem] lg:max-w-[90%] 2xl:w-[88rem]">
			<enhanced:img src="$lib/assets/research/Sponsors/NIH_NIDCD.jpg" alt="National Institute on Deafness and Other Communication Disorders" class="w-full h-fit max-w-[24rem] sm:h-24 sm:w-fit sm:max-w-none m-0 object-contain" fetchpriority="low" />
			<img src={Merck} alt="Merck Foundation" class="w-full h-fit max-w-[24rem] sm:h-24 sm:w-fit sm:max-w-none m-0 object-contain p-2 bg-white" fetchpriority="low" />
			<enhanced:img src="$lib/assets/research/Sponsors/HFSP.jpg" alt="Human Frontier Science Program" class="w-full h-fit max-w-[24rem] sm:h-24 sm:w-fit sm:max-w-none m-0 object-contain" fetchpriority="low" />
			<img src={NSFCareerAwards} alt="NSF Career Awards" class="w-full h-fit max-w-[24rem] sm:h-24 sm:w-fit sm:max-w-none m-0 object-contain" fetchpriority="low" />
			<enhanced:img src="$lib/assets/research/Sponsors/PattersonTrust.png" alt="The Robert E. Leet and Clara Guthrie Patterson Trust" class="w-full h-fit max-w-[24rem] sm:h-24 sm:w-fit sm:max-w-none m-0 object-contain" fetchpriority="low" />
			<enhanced:img src="$lib/assets/research/Sponsors/WhitehallFoundation.png" alt="Whitehall Foundation" class="w-full h-fit max-w-[24rem] sm:h-24 sm:w-fit sm:max-w-none m-0 object-contain" fetchpriority="low" />
		</div>
	</section>
</main>


<style>
    /* Note the var(--spacing) * MULTIPLIER here should match the height of the nav bar (see +layout.svelte) */
    /* For example, of the nav height is h-14, the multiplier here is 14 */
	.hero {
		min-height: calc(100vh - (var(--spacing) * 14));
	}

	.hero-media {
		height: calc(100vh - (var(--spacing) * 14));
		min-height: calc(100vh - (var(--spacing) * 14));
	}

	@media (min-width: 40rem) {
		.hero {
			min-height: calc((100vh - (var(--spacing) * 14)) * 2.2 / 3);
		}

		.hero-media {
			height: calc((100vh - (var(--spacing) * 14)) * 2.2 / 3);
			min-height: calc((100vh - (var(--spacing) * 14)) * 2.2 / 3);
		}
	}

	@supports (height: 100svh) {
		.hero {
			min-height: calc(100svh - (var(--spacing) * 14));
		}

		.hero-media {
			height: calc(100svh - (var(--spacing) * 14));
			min-height: calc(100svh - (var(--spacing) * 14));
		}

		@media (min-width: 40rem) {
			.hero {
				min-height: calc((100svh - (var(--spacing) * 14)) * 2.2 / 3);
			}

			.hero-media {
				height: calc((100svh - (var(--spacing) * 14)) * 2.2 / 3);
				min-height: calc((100svh - (var(--spacing) * 14)) * 2.2 / 3);
			}
		}
	}

	/* By default, hide the arrow */
	/* On hover, make it display, fade in, and rotate 90 degrees */
	.hidden {
		display: none;
	}

	.visuallyhidden {
		opacity: 0;
		transition: 100ms;
	}

	/* Spin animation that rotate the arrow 90 degrees once during 200ms */
	.spin-arrow {
		animation: spin-arrow 350ms ease-in-out forwards;
	}

	.arrow-rotate-down {
		/* offset-y: 50%; */
		padding-top: -0.75rem;
		padding-left: 0;
		padding-bottom: 0.75rem;
		transform: rotate(90deg) translate3d(-20%, 0, 0);
	}

	@keyframes spin-arrow {
		from {
			/* transform: rotate(0deg) translate3d(-20%, 0, 0); */
			/* use rotate3d instead of rotate to avoid the flickering issue */
			transform: rotate3d(0, 0, 1, 0deg) translate3d(-20%, 0, 0);
			padding-top: 0;
			padding-bottom: 0;
			padding-left: 0.75rem;
		}
		to {
			/* transform: rotate(90deg) translateX(-20%); */
			transform: rotate3d(0, 0, 1, 90deg) translate3d(-20%, 0, 0);
			padding-top: -0.75rem;
			padding-bottom: 0.75rem;
			padding-left: 0;
		}
	}
</style>