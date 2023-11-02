import { getContext } from 'svelte';
import { writable, get } from 'svelte/store';
import { ContextStateSymbol, type TContext } from './context.js';

const useVariant = (name: string) => {
	const { getVariant, client } = getContext<TContext>(ContextStateSymbol);
	const currentClient = get(client);

	const initialVariant = getVariant(name);
	const variantStore = writable(initialVariant);

	const updateVariantValue = () => {
		const newVariant = getVariant(name);
		const currentVariant = get(variantStore);
		if (newVariant?.name !== currentVariant.name || newVariant.enabled !== currentVariant.enabled) {
			variantStore.set(newVariant!);
		}
	};

	currentClient?.on('update', updateVariantValue);
	currentClient?.on('ready', updateVariantValue);

	return variantStore;
};

export default useVariant;
