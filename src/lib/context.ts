import type { Writable } from 'svelte/store';
import type { IContext, IVariant, UnleashClient } from 'unleash-proxy-client';

export const ContextStateSymbol = Symbol('Context state identifier');

export type eventArgs = [Function, any];

export type TContext = {
	on: (event: string, ...args: eventArgs) => void;
	updateContext: (context: IContext) => Promise<void>;
	isEnabled: (name: string) => boolean | undefined;
	getVariant: (name: string) => IVariant | undefined;
	client: Writable<UnleashClient | undefined>;
	flagsReady: Writable<boolean>;
	flagsError: Writable<any | null>;
};
