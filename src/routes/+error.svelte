<script lang="ts">
    import * as Alert from "$lib/components/ui/alert/index.js";
	import { page } from '$app/state';

    import {
        Coffee,
        CookingPot,
        CircleAlert,
        Ghost,
        FlaskConicalOff,
        MoveUpLeft,
    } from "@lucide/svelte/icons";

</script>

<svelte:head>
    <meta name="robots" content="noindex" />
</svelte:head>

<main class="w-full h-full">
    <div class="w-full h-full flex flex-col items-center justify-center gap-6 text-center">
    
        <!-- If the page is /team/* -->
        {#if page.url.pathname.startsWith('/team/') && page.status === 404}
            <!-- flex row for the h1 and icon -->
            <div class="flex flex-row items-center justify-center gap-4">
                <h1 class="text-5xl font-bold text-foreground"><i>Oops!</i></h1>
                <Ghost class="h-10 w-10" />
            </div>

            <p class="text-2xl text-foreground">Is this a ghost member?</p>
            <Alert.Root variant="destructive" class="max-w-[92%] w-[20rem] p-3 pb-[0.85rem] sm:w-[21rem] md:w-[22rem] lg:w-[23rem] border-destructive/50 border-2">
                <CircleAlert class="size-5.5!" />
                <Alert.Title class="text-left ml-1 mb-1 text-base font-bold mt-[0.085rem]">HTTP {page.status} - {@html page.error?.message}</Alert.Title>
                <Alert.Description class="text-left text-base">
                    <p>
                        Click <a href="##" title="Go back to previous page" onclick={() => history.back()} class="underline underline-offset-2">here</a> to go back a page, or go to <a href="/" title="Go to homepage" class="underline underline-offset-2">homepage</a>.
                    </p>
                </Alert.Description>
            </Alert.Root>


        <!-- More Else If here -->

        {:else if page.url.pathname.startsWith('/tea/')}
            <!-- Subtle Easter Egg (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) -->
            <div class="flex flex-row items-center justify-center gap-4">
                <h1 class="text-5xl font-bold text-foreground"><i>Hmmm...</i></h1>
                <CookingPot class="h-10 w-10" />
            </div>

            <p class="text-2xl text-foreground">I'm a teapot! (Am I?)</p>
            <Alert.Root variant="destructive" class="max-w-[92%] w-[20rem] p-3 pb-[0.85rem] sm:w-[21rem] md:w-[22rem] lg:w-[23rem] border-destructive/50 border-2">
                <Coffee class="size-5.5!" />
                <Alert.Title class="text-left ml-1 mb-1 text-base font-bold mt-[0.085rem]">HTTP <s>{page.status}</s> 418?</Alert.Title>
                <Alert.Description class="text-left text-base">
                    <span class="flex flex-row items-center justify-start gap-2">
                        <MoveUpLeft class="h-4 w-4" /> That's a coffee mug :v
                    </span>
                </Alert.Description>
            </Alert.Root>


        {:else}
            <!-- Boring default with a flask icon -->
            <div class="flex flex-row items-center justify-center gap-4">
                <h1 class="text-5xl font-bold text-foreground"><i>Oops!</i></h1>
                <FlaskConicalOff class="h-10 w-10" />
            </div>

            <Alert.Root variant="destructive" class="max-w-[92%] w-[20rem] p-3 pb-[0.85rem] sm:w-[21rem] md:w-[22rem] lg:w-[23rem] border-destructive/50 border-2">
                <CircleAlert class="size-5.5!" />
                <Alert.Title class="text-left ml-1 mb-1 text-base font-bold mt-[0.085rem]">HTTP {page.status} - {@html page.error?.message}</Alert.Title>
                <Alert.Description class="text-left text-base">
                    <p>
                        Click <a href="##" title="Go back to previous page" onclick={() => history.back()} class="underline underline-offset-2">here</a> to go back a page, or go to <a href="/" title="Go to homepage" class="underline underline-offset-2">homepage</a>.
                    </p>
                </Alert.Description>
            </Alert.Root>
        {/if}
    </div>
</main>
