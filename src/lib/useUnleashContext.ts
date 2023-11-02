import { getContext } from 'svelte';
import { ContextStateSymbol, type TContext } from './context.js';

const useUnleashContext = () => {
	const { updateContext } = getContext<TContext>(ContextStateSymbol);

	return updateContext;
};

export default useUnleashContext;
