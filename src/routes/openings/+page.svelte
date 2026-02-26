<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
</script>


<svelte:head>
	<title>Openings - Oviedo Lab</title>
	<meta name="description" content="Interested in our lab? We are open to new applications. Check out our openings" />

	<meta property="og:title" content="Openings - Oviedo Lab" />
	<meta property="og:description" content="Interested in our lab? We are open to new applications. Check out our openings" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://oviedolab.org/openings/" />
	<meta property="og:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png" />
	<meta property="og:image:alt" content="Openings - Oviedo Lab" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:site_name" content="Openings - Oviedo Lab" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:title" content="Openings - Oviedo Lab">
	<meta name="twitter:description" content="Interested in our lab? We are open to new applications. Check out our openings">
	<meta name="twitter:image" content="https://oviedolab.org/oviedolab-social-thumbnail.png">
	<meta name="twitter:image:alt" content="Openings - Oviedo Lab">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@">
	<meta name="twitter:creator" content="@">
	<meta name="twitter:url" content="https://oviedolab.org/openings/">

	<meta name="keywords" content="neuroscience, neural circuits, auditory cortex, social calls, mouse, rodent, animal, research, lab, washu, oviedo, hysell, research, job, jobs, application, openings, positions" />
</svelte:head>


<main class="flex h-full flex-col items-center justify-start pt-10 sm:pt-10">
	<h1 class="text-center text-4xl font-bold text-foreground">Openings</h1>

	<!-- Openings Section -->
	<section class="relative isolate w-full flex flex-col items-center justify-center mt-10 sm:mt-12">
		<!-- Background Image -->
		<div class="absolute w-full h-full min-h-120! top-0 left-0 overflow-clip flex items-center justify-center -z-10 bg-stone-600">
			<enhanced:img src="$lib/assets/openings/NRB_photo.jpg" alt="WashU Neuroscience Research Building" class="w-full h-full scale-[3] md:scale-[2] object-cover object-center bg-no-repeat bg-center bg-fill blur-sm brightness-[0.85] dark:brightness-[0.4] select-none pointer-events-none" fetchpriority="high" loading="eager" />
		</div>

		<!-- Section Content -->
		<div class="max-w-full w-[95%] min-h-120! py-10 flex flex-col items-center justify-start gap-6 sm:flex-row sm:flex-wrap sm:gap-8 sm:justify-center sm:items-stretch">
			<Card.Root class="flex flex-col items-center justify-start w-full max-w-[85%] grow sm:max-w-md md:max-w-sm bg-background/90 dark:bg-background/85 shadow-lg">
				<Card.Header class="w-full">
					<div class="mx-auto size-32 md:size-36 flex flex-col items-center justify-center rounded-full">
						<enhanced:img src="$lib/assets/openings/BrainImage.png" alt="Brain icon" class="w-full h-full rounded-full object-cover object-center aspect-square bg-muted max-h-xs max-w-xs md:max-h-sm md:max-w-sm select-none" sizes="min(1920px, 50vw)" />
					</div>
					<Card.Title>
                        <h2 class="mt-2 mx-auto text-center text-2xl! font-bold text-foreground md:text-3xl">
                        Postdoctoral Researcher
                        </h2>
                    </Card.Title>
					<!-- <Card.Description class="mx-auto text-center text-sm text-foreground md: text-md"></Card.Description> -->
				</Card.Header>
				<Card.Content class="w-full h-full pb-10">
					<p class="mx-2 sm:mx-4">
						We're recruiting postdoctoral researchers interested in studying neuropsychiatric disorders. Please contact Hysell Oviedo for details.
					</p>
				</Card.Content>
				<!-- <Card.Footer></Card.Footer> -->
			</Card.Root>
	
			<Card.Root class="flex flex-col items-center justify-start w-full max-w-[85%] grow sm:max-w-md md:max-w-sm bg-background/90 dark:bg-background/85 shadow-lg">
				<Card.Header class="w-full">
					<div class="mx-auto size-32 md:size-36 flex flex-col items-center justify-center rounded-full">
						<enhanced:img src="$lib/assets/openings/BrainImage.png" alt="Brain icon" class="w-full h-full rounded-full object-cover object-center aspect-square bg-muted max-h-xs max-w-xs md:max-h-sm md:max-w-sm select-none" sizes="min(1920px, 50vw)" />
					</div>
                    <Card.Title>
                        <h2 class="mt-2 mx-auto text-center text-2xl! font-bold text-foreground md:text-3xl">
                        Graduate Student
                        </h2>
                    </Card.Title>
					<!-- <Card.Description class="mx-auto text-center text-sm text-foreground md: text-md"></Card.Description> -->
				</Card.Header>
				<Card.Content class="w-full h-full pb-10">
					<p class="mx-2 sm:mx-4">
						The lab is actively recruiting graduate students!
					</p>
				</Card.Content>
				<!-- <Card.Footer></Card.Footer> -->
			</Card.Root>
	
			<Card.Root class="flex flex-col items-center justify-start w-full max-w-[85%] grow sm:max-w-md md:max-w-sm bg-background/90 dark:bg-background/85 shadow-lg">
				<Card.Header class="w-full">
					<div class="mx-auto size-32 md:size-36 flex flex-col items-center justify-center rounded-full">
						<enhanced:img src="$lib/assets/openings/BrainImage.png" alt="Brain icon" class="w-full h-full rounded-full object-cover object-center aspect-square bg-muted max-h-xs max-w-xs md:max-h-sm md:max-w-sm select-none" sizes="min(1920px, 50vw)" />
					</div>
                    <Card.Title>
                        <h2 class="mt-2 mx-auto text-center text-2xl! font-bold text-foreground md:text-3xl">
                        Research Assistant
                        </h2>
                    </Card.Title>
					<!-- <Card.Description class="mx-auto text-center text-sm text-foreground md: text-md"></Card.Description> -->
				</Card.Header>
				<Card.Content class="w-full h-full pb-10">
					<p class="mx-2 sm:mx-4">
						The Oviedo Lab is in search of a Research Assistant. This position assists with research study, experiments, preparation of material and documentation.
					</p>
				</Card.Content>
				<!-- <Card.Footer class="w-full">
					<Button aria-disabled class="w-full text-md md:text-lg" href="##" target="_blank" rel="noopener noreferrer">
						Apply Now <ExternalLink class="ml-2 h-4 w-4" />
					</Button>
				</Card.Footer> -->
			</Card.Root>
		</div>
	
		
	</section>
	
	<section
		id="research-focus"
		class="w-full flex flex-col items-center justify-center gap-6 bg-stone-100 py-16 dark:bg-stone-900 sm:py-20"
	>
		<p class="text-center text-xl font-semibold text-foreground mx-8 sm:mx-12 md:text-2xl lg:mx-20 drop-shadow-xl">
			Interested applicants should email a CV, a cover letter, and contact information for three references to:
		</p>
		<div class="text-center text-xl font-semibold text-muted-foreground mx-8 sm:mx-12 md:text-2xl lg:mx-20 drop-shadow-xl">
			<p class="my-4">Hysell V. Oviedo, Ph.D.</p>
			<p class="text-lg md:text-xl">
				Washington University in St. Louis
				<br />
				Jeffrey T. Fort Neuroscience Building
				<br />
				4370 Duncan Ave, St Louis, MO 63119
				<br />
				8th Floor, Synapses and Circuits, 8325
				<br />
				hysell [at] wustl [dot] edu
			</p>
		</div>
	</section>

	<!-- Lab Location -->
	<section class="w-full flex flex-col items-center justify-center gap-6 py-12 sm:py-20">
		<h2 class="text-center text-4xl font-bold text-foreground">Lab Location</h2>

		<div class="w-[90%] h-[35vh] min-h-120 md:h-[50vh] my-4 flex flex-col items-center justify-center gap-6 sm:gap-10 rounded-md">
			<iframe title="Oviedo Lab location - WashU Neuroscience Research Building" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.563651663377!2d-90.25783572316011!3d38.63591817178092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b59e2ca60fbb%3A0xaaf0bff54b1d53be!2sWashU%20Neuroscience%20Building!5e0!3m2!1sen!2sus!4v1727816147257!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy"referrerpolicy="no-referrer-when-downgrade" class="rounded-md"></iframe>
		</div>
	</section>
</main>