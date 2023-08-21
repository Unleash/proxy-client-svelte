import { getContext } from 'svelte';
import { writable, get } from 'svelte/store';
import { ContextStateSymbol, type TContext } from './context';

const useFlag = (name: string) => {
	const { isEnabled, client } = getContext<TContext>(ContextStateSymbol);
	const currentClient = get(client);

	const flag = writable(Boolean(isEnabled(name)));

	const updateFlagValue = () => {
		const enabled = Boolean(isEnabled(name));
		if (enabled !== get(flag)) {
			flag.set(enabled);
		}
	};

	currentClient.on('update', updateFlagValue);
	currentClient.on('ready', updateFlagValue);

	return flag;
};

export default useFlag;
