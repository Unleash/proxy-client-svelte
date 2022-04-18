import { getContext } from 'svelte';
import { get } from 'svelte/store';
import { ContextStateSymbol } from './context';
import type { UnleashClient } from 'unleash-proxy-client';

const useUnleashClient = () => {
	const { client } = getContext(ContextStateSymbol);

	return get(client) as UnleashClient;
};

export default useUnleashClient;
