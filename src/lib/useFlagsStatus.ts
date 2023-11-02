import { getContext } from 'svelte';
import { ContextStateSymbol, type TContext } from './context.js';

const useFlagsStatus = () => {
	const { flagsReady, flagsError } = getContext<TContext>(ContextStateSymbol);

	return { flagsReady, flagsError };
};

export default useFlagsStatus;
