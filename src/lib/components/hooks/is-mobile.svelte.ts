import { untrack } from "svelte";

const MOBILE_BREAKPOINT = 768;

/**
 * A client-side hook that checks if the current viewport is mobile-sized
 * based on a media query. Reactively updates when the window is resized.
 * 
 * @returns A read-only reactive state indicating whether the viewport is mobile
 */
export class IsMobile {
	#isMobile = $state(false);
	#mediaQuery: MediaQueryList | null = null;

	constructor() {
		if (typeof window !== "undefined") {
			this.#mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
			this.#isMobile = this.#mediaQuery.matches;

			// Listen for changes in the media query
			this.#mediaQuery.addEventListener("change", this.#handleChange);
		}
	}

	#handleChange = (e: MediaQueryListEvent) => {
		this.#isMobile = e.matches;
	};

	/**
	 * Returns true if the viewport is mobile-sized
	 */
	get current() {
		return this.#isMobile;
	}

	/**
	 * Cleanup method to remove event listeners
	 */
	destroy() {
		if (this.#mediaQuery) {
			this.#mediaQuery.removeEventListener("change", this.#handleChange);
		}
	}
}
