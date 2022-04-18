import { getContext } from 'svelte';
import { ContextStateSymbol } from './context';

const useFlagsStatus = () => {
	const { flagsReady, flagsError } = getContext(ContextStateSymbol);

	return { flagsReady, flagsError };
};

export default useFlagsStatus;
