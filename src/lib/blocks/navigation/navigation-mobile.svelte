<script lang="ts">
    import { cn } from "$lib/utils";

    import { NavigationData } from "./navigation";
    import { Button } from "$lib/components/ui/button/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";

    import {
        Menu,
    } from "@lucide/svelte/icons";

    import { RenderIcon } from "$lib/components/ui/simple-icons/simple-icons.svelte";

    import { page } from "$app/state";

    type NavigationProps = {
        class: string;
    };
    let { class: className }: NavigationProps = $props();


    let sheetOpen = $state(false);
</script>

<Sheet.Root bind:open={sheetOpen}>
    <Sheet.Trigger class={cn(buttonVariants({ variant: "outline", size: "icon" }), "bg-accent/25 hover:bg-accent/35 border-accent/30", className)}>
        <Menu class="size-4 text-foreground/85" />
        <span class="sr-only">Open navigation menu</span>
    </Sheet.Trigger>
    <Sheet.Content  class="z-99999999 w-70 max-w-full! bg-background/75 dark:bg-background/70 backdrop-blur-lg rounded-r-lg isolate" side="left">
        <Sheet.Header>
            <Sheet.Title class="h-fit">
                <Button
                    variant="ghost"
                    class="size-fit px-1.5! py-1.5! text-foreground/85 hover:bg-transparent hover:text-foreground! dark:hover:bg-transparent"
                    href="/"
                    onclick={() => sheetOpen = false}
                >
                    <svelte:boundary>
                        {@render RenderIcon({ name: "oviedoLab", class: "size-12", fill: "currentColor" })}
                    </svelte:boundary>
                    <span class="ml-2 font-semibold text-lg mb-px">Oviedo Lab</span>
                </Button>
            </Sheet.Title>
            <Sheet.Description class="flex flex-col items-start justify-start gap-4 mt-2">
                {#each NavigationData as item}
                    <Button
                        variant="link"
                        class={cn(
                            "py-1.5! px-2! align-middle leading-0 font-semibold text-base no-underline! text-accent-foreground/65 hover:text-accent-foreground",
                            // If current route is / && item.href is /, or if current route starts with item.href (for subroutes), then apply active styles
                            (page.url.pathname === item.href || (item.href !== "/" && page.url.pathname.startsWith(item.href))) 
                                ? "text-accent-foreground/95"
                                : ""
                        )}
                        href={item.href}
                        onclick={() => sheetOpen = false}
                    >
                        <span class="span-clip">
                            {item.title}
                        </span>
                    </Button>
                {/each}
            </Sheet.Description>
        </Sheet.Header>
    </Sheet.Content>
</Sheet.Root>
