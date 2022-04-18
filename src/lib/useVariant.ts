import { getContext } from 'svelte';
import { writable, get } from 'svelte/store';
import { ContextStateSymbol } from './context';
import type { UnleashClient } from 'unleash-proxy-client';

const useVariant = (name: string) => {
	const { getVariant, client } = getContext(ContextStateSymbol);
	const $client = get(client) as UnleashClient;
	const variant = getVariant(name);
	const variantStore = writable(variant);

	$client.on('update', () => {
		const newVariant = getVariant(name);
		if (newVariant.name !== variant.name || newVariant.enabled !== variant.enabled) {
			variantStore.set(newVariant);
		}
	});

	$client.on('ready', () => {
		variantStore.set(getVariant(name));
	});

	return variantStore;
};

export default useVariant;
