<script lang="ts">
    import * as Alert from "$lib/components/ui/alert/index.js";
	import { page } from '$app/state';
    
    import {
        CircleAlert,
        Ghost,
    } from "@lucide/svelte/icons";
</script>

<main>
    <div class="w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center" style="min-height: calc(100vh - 4rem)">
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
    </div>
</main>