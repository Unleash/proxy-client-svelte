import { getContext } from 'svelte';
import { get } from 'svelte/store';
import { ContextStateSymbol, type TContext } from './context.js';

const useUnleashClient = () => {
	const { client } = getContext<TContext>(ContextStateSymbol);

	return get(client);
};

export default useUnleashClient;
