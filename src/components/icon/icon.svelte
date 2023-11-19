<script lang="ts">
import { ICON_MAP } from './icon-map';
import type { IconType } from './icon-type';

export let size: number;
export let type: IconType;

let svg: string;

$: ICON_MAP[type]().then((icon) => {
	svg = icon;
});
</script>

<span style:width={`${size}px`} style:height={`${size}px`} class="root">
	{#if svg}
		{@html svg}
	{/if}
</span>

<style>
.root {
	display: block;
}
</style>
