<script lang="ts">
import type { Hst } from '@histoire/plugin-svelte';
import BrightnessMeter from './brightness-meter.svelte';
import { onDestroy, onMount } from 'svelte';

export let Hst: Hst;

const step = 0.01;
let value = 1;
let optimum = 0.5;
let min = 0;
let max = 1;

let isCompact = false;

let transitionValue = 0;
let transitionValueInterval: NodeJS.Timeout | null = null;

onMount(() => {
	transitionValueInterval = setInterval(() => {
		transitionValue = Math.random();
	}, 1000);
});
onDestroy(() => {
	if (transitionValueInterval) {
		clearInterval(transitionValueInterval);
	}
});
</script>

<Hst.Story title="Brightness meter">
	<Hst.Variant title="Value > optimum">
		<div class="container">
			<BrightnessMeter value={0.65} optimum={0.5} />
		</div>
	</Hst.Variant>
	<Hst.Variant title="Value < optimum">
		<div class="container">
			<BrightnessMeter value={0.35} optimum={0.5} />
		</div>
	</Hst.Variant>
	<Hst.Variant title="Value transition">
		<div class="container">
			<BrightnessMeter value={transitionValue} optimum={0.5} min={0} max={1} />
			<p class="transition-value">
				Value: {transitionValue.toFixed(2)}
			</p>
		</div>
	</Hst.Variant>
	<Hst.Variant title="Compact">
		<div class="container" style:width="319px">
			<BrightnessMeter value={-3} optimum={0} min={-5} max={5} />
		</div>
	</Hst.Variant>

	<Hst.Variant title="Playground">
		<svelte:fragment slot="controls">
			<Hst.Checkbox title="Compact" bind:value={isCompact} />
			<Hst.Slider title="Value" bind:value {min} {max} {step} />
			<Hst.Slider title="Optimum" bind:value={optimum} {min} {max} {step} />
			<Hst.Slider title="Min" bind:value={min} {max} {step} min={-10} />
			<Hst.Slider title="Max" bind:value={max} {min} {step} max={10} />
		</svelte:fragment>

		<div class="container" style:width={isCompact ? '319px' : undefined}>
			<BrightnessMeter {value} {optimum} {min} {max} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
:root {
	--white-40: rgba(255, 255, 255, 0.4);
	--white-60: rgba(255, 255, 255, 0.6);
	--white-100: rgb(255, 255, 255);
	--black-60: rgba(0, 0, 0, 0.4);
}

.container {
	margin: auto;
	display: flex;
	flex-direction: column;
	padding: 30px 0;
	background-color: var(--black-60);
	border-radius: 4px;
}

.transition-value {
	margin: 0 auto;
	padding: 8px;
	display: inline-block;
	border-radius: 4px;
	background-color: var(--white-40);
	color: var(--white-100);
}
</style>
