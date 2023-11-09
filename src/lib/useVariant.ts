import { getContext } from 'svelte';
import { writable, get } from 'svelte/store';
import { ContextStateSymbol, type TContext } from './context.js';
import type { IVariant } from 'unleash-proxy-client';

const variantHasChanged = (oldVariant: IVariant, newVariant?: IVariant): boolean => {
	const variantsAreEqual =
		oldVariant.name === newVariant?.name &&
		oldVariant.enabled === newVariant?.enabled &&
		oldVariant.feature_enabled === newVariant?.feature_enabled &&
		oldVariant.payload?.type === newVariant?.payload?.type &&
		oldVariant.payload?.value === newVariant?.payload?.value;

	return !variantsAreEqual;
};

const useVariant = (name: string) => {
	const { getVariant, client } = getContext<TContext>(ContextStateSymbol);
	const currentClient = get(client);

	const initialVariant = getVariant(name);
	const variantStore = writable(initialVariant);

	const updateVariantValue = () => {
		const newVariant = getVariant(name);
		const currentVariant = get(variantStore);
		if (variantHasChanged(currentVariant, newVariant)) {
			variantStore.set(newVariant!);
		}
	};

	currentClient?.on('update', updateVariantValue);
	currentClient?.on('ready', updateVariantValue);

	return variantStore;
};

export default useVariant;
