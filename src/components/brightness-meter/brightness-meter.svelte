<script context="module">
export const N_SEGMENTS = 7;
export const LARGE_BREAKPOINT = 320;
export const ICON_TEST_ID = 'brightness-meter-icon';
export const SEGMENTS_TEST_ID = 'brightness-meter-segments';

const ICON_SIZE = 20;
const LAST_SEGMENT_INDEX = N_SEGMENTS - 1;
const VALUE_TRANSITION_DURATION = 300;
</script>

<script lang="ts">
import { tweened } from 'svelte/motion';
import { valueInBounds } from '@/utils/valueInBounds';
import Icon from '@/components/icon/icon.svelte';

export let min: number = 0;
export let max: number = 1;
export let optimum: number;
export let value: number;

let width: number;
$: isLarge = width >= LARGE_BREAKPOINT;

const tweenedValue = tweened(value, { duration: VALUE_TRANSITION_DURATION });

$: $tweenedValue = valueInBounds(value, { min, max });
$: activeSegmentIndex = valueInBounds(Math.round((($tweenedValue - min) / (max - min)) * LAST_SEGMENT_INDEX), {
	min: 0,
	max: LAST_SEGMENT_INDEX,
});
$: isOptimumExceeded = $tweenedValue >= optimum;

const segments = Array.from({ length: N_SEGMENTS }).map((_, i) => i);
</script>

<div
	bind:clientWidth={width}
	class="root"
	class:large={isLarge}
	role="meter"
	aria-valuenow={value}
	aria-valuemax={max}
	aria-valuemin={min}
>
	<div class="icon" class:active={!isOptimumExceeded} data-testid={ICON_TEST_ID}>
		<Icon type="MOON" size={ICON_SIZE} />
	</div>

	<div class="segments" data-testid={SEGMENTS_TEST_ID}>
		{#each segments as segment (segment)}
			<div
				class="segment"
				class:active={segment <= activeSegmentIndex}
				class:current={segment === activeSegmentIndex}
				class:semi-active={segment === activeSegmentIndex - 1 || segment === activeSegmentIndex + 1}
			/>
		{/each}
	</div>

	<div class="icon" class:active={isOptimumExceeded} data-testid={ICON_TEST_ID}>
		<Icon type="SUN" size={ICON_SIZE} />
	</div>
</div>

<style lang="postcss">
.root {
	--inactive-color: var(--white-40, rgba(255, 255, 255, 0.4));
	--semi-active-color: var(--white-60, rgba(255, 255, 255, 0.6));
	--active-color: var(--white-100, #fff);

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 24px;
}

.icon,
.segment {
	color: var(--inactive-color);
	transition: color 0.3s;

	&.active {
		color: var(--active-color);
	}
}

.segments {
	display: flex;
	gap: 10px;
	padding: 12px 0;
}

.segment {
	size: 6px 20px;
	border-radius: 2px;
	background-color: currentColor;
	transition-duration: 0.3s;
	transition-property: transform, box-shadow, color;

	&.current {
		border-radius: 2px / 1px;
		transform: scaleY(1.8);
	}

	&.active {
		box-shadow: 0px 0px 24px -2px currentColor, 0px 0px 6px -1px currentColor;
	}

	&.semi-active {
		transform: scaleY(1.2);

		&:not(.active) {
			color: var(--semi-active-color);
		}
	}
}

.large {
	&.root {
		gap: 28px;
	}

	.segments {
		gap: 8px;
	}

	.segment {
		size: 10px 24px;
		border-radius: 3px;
		transform: scaleX(0.8);

		&.current {
			border-radius: 3px / 2px;
			transform: scaleY(1.75);
		}

		&.semi-active {
			border-radius: 3px / 2px;
			transform: scale(0.8, 1.167);
		}
	}
}
</style>
