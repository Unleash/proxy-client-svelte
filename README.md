# Installation

```bash
npm install @unleash/proxy-client-svelte
# or
yarn add @unleash/proxy-client-svelte
```

# How to use

## Initialize the client

Depending on your needs and specific use-case, prepare one of:

- [Front-end API](https://docs.getunleash.io/reference/front-end-api)
- [Unleash Edge](https://docs.getunleash.io/reference/unleash-edge)
- [Unleash Proxy](https://docs.getunleash.io/reference/unleash-proxy)

And a respective frontend token (or, if you're using the Unleash Proxy, one of your proxy's designated client keys, previously known as proxy secrets).

Import the provider like this in your entrypoint file (typically index.svelte):

```svelte
<script lang="ts">
	import { FlagProvider } from '@unleash/proxy-client-svelte';

	const config = {
		url: '<unleash-url>/api/frontend', // Your Front-end API, Unleash Edge or Unleash Proxy URL
		clientKey: '<your-token>', // Front-end API token (or proxy client key)
		refreshInterval: 15, // How often (in seconds) the client should poll the proxy for updates
		appName: 'your-app-name' // The name of your application. It's only used for identifying your application
	};
</script>

<FlagProvider {config}>
	<App />
</FlagProvider>
```

### Connection options

To connect this SDK to your Unleash instance's [front-end API](https://docs.getunleash.io/reference/front-end-api), use the URL to your Unleash instance's front-end API (`<unleash-url>/api/frontend`) as the `url` parameter. For the `clientKey` parameter, use a `FRONTEND` token generated from your Unleash instance. Refer to the [_how to create API tokens_](https://docs.getunleash.io/how-to/how-to-create-api-tokens) guide for the necessary steps.

To connect this SDK to the [Unleash Edge](https://docs.getunleash.io/reference/unleash-edge), use the URL to your Unleash Edge instance as the `url` parameter. For the `clientKey` parameter, use a `FRONTEND` token generated from your Unleash Edge instance. Refer to the [_how to create API tokens_](https://docs.getunleash.io/how-to/how-to-create-api-tokens) guide for the necessary steps. Ensure that your Unleash Edge instance is correctly configured to have access to the feature toggles your `FRONTEND` token is requesting.

To connect this SDK to the [Unleash proxy](https://docs.getunleash.io/reference/unleash-proxy), use the proxy's URL and a [proxy client key](https://docs.getunleash.io/reference/api-tokens-and-client-keys#proxy-client-keys). The [_configuration_ section of the Unleash proxy docs](https://docs.getunleash.io/reference/unleash-proxy#configuration) contains more info on how to configure client keys for your proxy.

## Check feature toggle status

To check if a feature is enabled:

```svelte
<script lang="ts">
	import { useFlag } from '@unleash/proxy-client-svelte';

	const enabled = useFlag('travel.landing');
</script>

{#if $enabled}
	<SomeComponent />
{:else}
	<AnotherComponent />
{/if}
```

## Check variants

To check variants:

```svelte
<script lang="ts">
	import { useVariant } from '@unleash/proxy-client-svelte';

	const variant = useVariant('travel.landing');
</script>

{#if variant.enabled && variant.name === 'SomeComponent'}
	<SomeComponent />
{:else if variant.enabled && variant.name === 'AnotherComponent'}
	<AnotherComponent />
{:else}
	<DefaultComponent />
{/if}
```

## Defer rendering until flags fetched

useFlagsStatus retrieves the ready state and error events.
Follow the following steps in order to delay rendering until the flags have been fetched.

```svelte
<script lang="ts">
	import { useFlagsStatus } from '@unleash/proxy-client-svelte';

	const { flagsReady, flagsError } = useFlagsStatus();
</script>

{#if !$flagsReady}
	<Loading />
{:else}
	<MyComponent error={flagsError} />
{/if}
```

## Updating context

Initial context can be specified on a `FlagProvider` `config.context` property.

`<FlagProvider config={{ ...config, context: { userId: 123 }}>`

This code sample shows you how to update the unleash context dynamically:

```svelte
<script lang="ts">
	import { useUnleashContext, useFlag } from '@unleash/proxy-client-svelte';

	export let userId;

	const toggle = useFlag('my-toggle');
	const updateContext = useUnleashContext();

	$: {
		// context is updated with userId
		updateContext({ userId });
	}

	// OR if you need to perform an action right after new context is applied
	$: {
		async function run() {
			// Can wait for the new flags to pull in from the different context
			await updateContext({ userId });
			console.log('new flags loaded for', userId);
		}
		run();
	}
</script>
```

# Advanced use cases

## Deferring client start

By default, the Unleash client will start polling for toggles immediately when the `FlagProvider` component renders. You can prevent it by setting `startClient` prop to `false`. This is useful when you'd like to for example bootstrap the client and work offline.

Deferring the client start gives you more fine-grained control over when to start fetching the feature toggle configuration. This could be handy in cases where you need to get some other context data from the server before fetching toggles, for instance.

To start the client, use the client's `start` method. The below snippet of pseudocode will defer polling until the end of the `asyncProcess` function.

```svelte
<script lang="ts">
	const client = new UnleashClient({
		/* ... */
	});

	onMount(async () => {
		// do async work ...
		client.start();
	});
</script>

<FlagProvider unleashClient={client} startClient={false}>
	<App />
</FlagProvider>
```

## Use unleash client directly

```svelte
<script lang="ts">
	import { useUnleashContext, useUnleashClient } from '@unleash/proxy-client-svelte';

	export let userId;

	const client = useUnleashClient();

	const login = () => {
		// login user
		if (client.isEnabled('new-onboarding')) {
			// Send user to new onboarding flow
		} else {
			// send user to old onboarding flow
		}
	};
</script>

<LoginForm {login} />
```
