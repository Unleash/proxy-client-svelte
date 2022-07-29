export type {
	IConfig,
	IContext,
	IMutableContext,
	IVariant,
	IToggle,
	IStorageProvider
} from 'unleash-proxy-client';
export { UnleashClient, LocalStorageProvider, InMemoryStorageProvider } from 'unleash-proxy-client';

import { ContextStateSymbol } from './context';
import FlagProvider from './FlagProvider.svelte';
import useFlag from './useFlag';
import useFlagsStatus from './useFlagsStatus';
import useVariant from './useVariant';
import useUnleashContext from './useUnleashContext';
import useUnleashClient from './useUnleashClient';

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
