<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { ContextStateSymbol } from './context';
	import { UnleashClient } from 'unleash-proxy-client';
	import type { IConfig, IContext } from 'unleash-proxy-client';
	import { writable } from 'svelte/store';

	type eventArgs = [Function, any];

	export let config: IConfig = undefined;
	export let unleashClient: UnleashClient = undefined;
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

	if (!$client && config) {
		client.set(new UnleashClient(config));
	}

	$client?.on('ready', () => {
		flagsReady.set(true);
	});

	$client?.on('error', (e: any) => {
		flagsError.set(e);
	});

	onMount(() => {
		const shouldStartClient = startClient || !unleashClient;
		if (shouldStartClient) $client?.start();
	});

	const updateContext = async (context: IContext): Promise<void> => {
		await $client?.updateContext(context);
	};

	const isEnabled = (name: string) => $client?.isEnabled(name);
	const getVariant = (name: string) => $client?.getVariant(name);
	const on = (event: string, ...args: eventArgs) => $client?.on(event, ...args);

	setContext(ContextStateSymbol, {
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
