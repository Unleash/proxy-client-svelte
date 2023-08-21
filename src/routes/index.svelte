<script lang="ts">
	import HelloWorld from '../components/HelloWorld.svelte';

	import '../global.css';

	import { FlagProvider } from '$lib';

	const config = {
		url: 'https://app.unleash-hosted.com/demo/api/frontend',
		clientKey:
			'proxy-client-svelte:development.f7d5c2f3633769afea4eadecd6bf46194dccec9c75170930c76ab4f0',
		refreshInterval: 2,
		appName: 'proxy-client-svelte'
	};
</script>

<FlagProvider {config}>
	<HelloWorld />
</FlagProvider>
