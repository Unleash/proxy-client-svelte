<script lang="ts">
	import { onMount } from 'svelte';
	import HelloWorld from '../components/HelloWorld.svelte';

	let FlagProvider;

	onMount(async () => {
		const proxyClientSvelte = await import('$lib');
		({ FlagProvider } = proxyClientSvelte);
	});

	const config = {
		url: 'https://unleash-proxy.nunogois.com/proxy',
		clientKey: 'ng-unleash-secret',
		refreshInterval: 2,
		appName: 'unleash-test',
		environment: 'dev'
	};
</script>

<svelte:component this={FlagProvider} {config}>
	<HelloWorld />
</svelte:component>
