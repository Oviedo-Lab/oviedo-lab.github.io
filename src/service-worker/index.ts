/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;


import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files  // everything in `static`
];

function isMeteredConnection(): boolean {
	if ('connection' in navigator) {
		const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
		
		if (connection) {
			// Respect user's data saver setting
			if (connection.saveData === true) {
				return true;
			}
		}
	}
	return false;
}

function shouldCacheFile(url: string): boolean {
	// Extract file extension from URL
	const pathname = url.toLowerCase();
	const extension = pathname.split('.').pop() || '';
	
	// Define file extensions that should NOT be cached
	// Add more as needed, though the followings are intentionally included:
	// - svg (essential for navigation icons)
	// - pdf (members' CVs and resumes)
	const excludedExtensions = new Set([
		// Image formats
		'jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'ico', 'bmp', 'tiff', 'tif',
		// Video formats
		'mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v',
		// Audio formats
		'mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a',
		// Binary archives and compressed files
		'zip', 'rar', '7z', 'tar', 'gz', 'gzip', 'bz2', 'xz', 'br', 'lz4', 'zst',
		// Other binary formats, just in case
		'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'
	]);
	
	return !excludedExtensions.has(extension);
}

sw.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		// Skip aggressive pre-caching on metered connections
		if (isMeteredConnection()) {
			return;
		}
		
		const cache = await caches.open(CACHE);
		// Filter out media files and binary archives before caching
		const cachableAssets = ASSETS.filter(asset => shouldCacheFile(asset));
		await cache.addAll(cachableAssets);
	}

	event.waitUntil(addFilesToCache());
});

sw.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event) => {
	// ignore POST requests etc
	if (event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` can always be served from the cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}
		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);

			// if we're offline, fetch can return a value that is not a Response
			// instead of throwing - and we can't pass this non-Response to respondWith
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}
            // cache all successful responses - browser will manage storage automatically
			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			// if there's no cache, then just error out
			// as there is nothing we can do to respond to this request
			throw err;
		}
	}

	event.respondWith(respond());
});