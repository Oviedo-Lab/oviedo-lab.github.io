<script lang="ts">
    import { cn } from "$lib/utils";

    import { RenderIcon } from "$lib/components/ui/simple-icons/simple-icons.svelte";
    import { Button } from "$lib/components/ui/button/index.js";

    import { toggleMode } from "mode-watcher";
    import {
        Sun,
        Moon,
    } from "@lucide/svelte/icons";

    import NavDesktop from "./navigation-desktop.svelte";
    import NavMobile from "./navigation-mobile.svelte";

    type NavigationProps = {
        class: string,
    }
    let {
        class: className,
    }: NavigationProps = $props();

</script>

<nav 
    class={cn(
        "h-full w-full flex flex-row items-center justify-start gap-2 px-2",
        className
    )}
>
    <Button
        variant="ghost"
        class="size-fit ml-1 mt-1 px-1.5! py-1.5! text-foreground/90 hover:bg-transparent hover:text-foreground! dark:hover:bg-transparent"
        href="/"    
    >
        <svelte:boundary>
            {@render RenderIcon({ name: "oviedoLab", class: "size-12.5 text-foreground min-[768px]:text-foreground/95", fill: "currentColor" })}
        </svelte:boundary>
        <span class="sr-only">Oviedo Lab Homepage</span>
    </Button>
    
    <Button
        variant="link"
        class="p-1! font-semibold text-lg no-underline! text-foreground/90 hover:text-foreground min-[768px]:hidden"
        href="/"
    >
        Oviedo Lab
    </Button>

    <NavDesktop class="hidden min-[768px]:flex" />

    <!-- Right items -->
    <div class="h-full w-fit flex flex-row items-center justify-center gap-2 ml-auto">
        <Button onclick={toggleMode} variant="outline" size="icon" class="bg-accent/25 hover:bg-accent/35 border-accent/30">
            <Sun
                class="size-4 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0 text-foreground/85"
            />
            <Moon
                class="absolute size-4 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90 text-foreground/85"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
    
        <NavMobile class="flex min-[768px]:hidden" />
    </div>
</nav>