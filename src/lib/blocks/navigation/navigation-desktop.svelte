<script lang="ts">
    import { cn } from "$lib/utils";

    import { NavigationData } from "./navigation";
    import { Button } from "$lib/components/ui/button/index.js";

    import { page } from "$app/state";

    type NavigationProps = {
        class: string,
    }
    let {
        class: className,
    }: NavigationProps = $props();
</script>

<div class={cn("hidden min-[768px]:flex flex-row gap-1 items-center justify-start w-fit mblock", className)}>
    {#each NavigationData as item}
        <Button
            variant="link"
            class={cn(
                "py-1.5! px-2! mx-0.5 align-middle leading-0 font-semibold text-base no-underline! text-accent-foreground/65 hover:text-accent-foreground",
                // If current route is / && item.href is /, or if current route starts with item.href (for subroutes), then apply active styles
                (page.url.pathname === item.href || (item.href !== "/" && page.url.pathname.startsWith(item.href))) 
                    ? "text-accent-foreground/95"
                    : ""
            )}
            href={item.href}
        >
            <span class="span-clip">
                {item.title}
            </span>
        </Button>
    {/each}
</div>

<style lang="postcss">
	.span-clip::before {
		content: '';
		display: table;
		margin-bottom: -0.40em !important;
	}
	.span-clip::after {
		content: '';
		display: table;
		margin-top: -0.34em !important;
	}
</style>