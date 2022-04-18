import { getContext } from 'svelte';
import { ContextStateSymbol } from './context';

const useUnleashContext = () => {
	const { updateContext } = getContext(ContextStateSymbol);

	return updateContext;
};

export default useUnleashContext;
