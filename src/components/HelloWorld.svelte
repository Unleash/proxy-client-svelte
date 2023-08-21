<script lang="ts">
	import logo from '$assets/svelte.png';

	import { useFlag, useFlagsStatus, useVariant } from '$lib';

	const enabled = useFlag('svelte-test-feature');
	const variant = useVariant('svelte-test-feature');
	const { flagsReady } = useFlagsStatus();
</script>

<main>
	<img src={logo} alt="Svelte Logo" />
	<h1>proxy-client-svelte</h1>

	{#if !$flagsReady}
		<p>Loading...</p>
	{:else}
		<p style={`font-size:24px; color: ${$enabled ? 'green' : 'red'}`}>
			{$enabled ? 'Feature is enabled!' : 'Feature is disabled!'}
			{#if $variant.enabled}
				<p>{$variant.name}</p>
			{/if}
		</p>
	{/if}

	<p style="max-width: 400px; margin: auto; padding: 20px">
		Check out <a href="https://www.getunleash.io/">Unleash</a> - An open-source Feature Management Service
		that allows you to manage your feature roll-out like a pro.
	</p>

	<p>See <code>README.md</code> for more information.</p>

	<p>
		Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.
	</p>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	img {
		height: 16rem;
		width: 16rem;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 2rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 1rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>
