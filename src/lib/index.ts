export type {
	IConfig,
	IContext,
	IMutableContext,
	IVariant,
	IToggle,
	IStorageProvider
} from 'unleash-proxy-client';
export { UnleashClient, LocalStorageProvider, InMemoryStorageProvider } from 'unleash-proxy-client';

import { ContextStateSymbol } from './context.js';
import FlagProvider from './FlagProvider.svelte';
import useFlag from './useFlag.js';
import useFlagsStatus from './useFlagsStatus.js';
import useVariant from './useVariant.js';
import useUnleashContext from './useUnleashContext.js';
import useUnleashClient from './useUnleashClient.js';

export {
	ContextStateSymbol,
	FlagProvider,
	useFlag,
	useFlagsStatus,
	useVariant,
	useUnleashContext,
	useUnleashClient
};

export default FlagProvider;
