<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { ContextStateSymbol, type TContext, type eventArgs } from './context.js';
	import { UnleashClient } from 'unleash-proxy-client';
	import type { IConfig, IContext } from 'unleash-proxy-client';
	import { get, writable } from 'svelte/store';

	export let config: IConfig | undefined = undefined;
	export let unleashClient: UnleashClient | undefined = undefined;
	export let startClient = true;

	let client = writable<UnleashClient | undefined>(unleashClient);
	let flagsReady = writable(false);
	let flagsError = writable(null);

	if (!config && !unleashClient) {
		console.warn(
			`You must provide either a config or an unleash client to the flag provider. If you are initializing the client in useEffect, you can avoid this warning by
      checking if the client exists before rendering.`
		);
	}

	if (!get(client) && config) {
		client.set(new UnleashClient(config));
	}

	const currentClient = get(client);

	currentClient?.on('ready', () => {
		flagsReady.set(true);
	});

	currentClient?.on('error', (e: any) => {
		flagsError.set(e);
	});

	onMount(() => {
		const currentClient = get(client);
		const shouldStartClient = startClient || !unleashClient;
		if (shouldStartClient) currentClient?.start();
	});

	const updateContext = async (context: IContext): Promise<void> => {
		const currentClient = get(client);
		await currentClient?.updateContext(context);
	};

	const isEnabled = (name: string) => {
		const currentClient = get(client);
		return currentClient?.isEnabled(name);
	};

	const getVariant = (name: string) => {
		const currentClient = get(client);
		return currentClient?.getVariant(name);
	};

	const on = (event: string, ...args: eventArgs) => {
		const currentClient = get(client);
		return currentClient?.on(event, ...args);
	};

	setContext<TContext>(ContextStateSymbol, {
		on,
		updateContext,
		isEnabled,
		getVariant,
		client,
		flagsReady,
		flagsError
	});
</script>

<slot />
