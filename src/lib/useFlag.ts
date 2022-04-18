import { getContext } from 'svelte';
import { writable, get } from 'svelte/store';
import { ContextStateSymbol } from './context';
import type { UnleashClient } from 'unleash-proxy-client';

const useFlag = (name: string) => {
	const { isEnabled, client } = getContext(ContextStateSymbol);
	const $client = get(client) as UnleashClient;
	const flag = writable(!!isEnabled(name));

	$client.on('update', () => {
		const enabled = isEnabled(name);
		if (enabled !== flag) {
			flag.set(!!enabled);
		}
	});

	$client.on('ready', () => {
		flag.set(isEnabled(name));
	});

	return flag;
};

export default useFlag;
