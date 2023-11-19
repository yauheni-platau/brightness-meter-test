/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/svelte';
import BrightnessMeter, {
	N_SEGMENTS,
	LARGE_BREAKPOINT,
	SEGMENTS_TEST_ID,
	ICON_TEST_ID,
} from './brightness-meter.svelte';
import type { ComponentProps } from 'svelte';

describe('BrightnessMeter', () => {
	afterEach(() => {
		cleanup();
	});

	it('Should render with correct active and semi-active segments, icon and current segment', async () => {
		brightnessMeterBaseline({ value: 0.65, optimum: 0.5, min: 0, max: 1 }, { expectedActiveSegments: 5 });

		const icons = await screen.findAllByTestId(ICON_TEST_ID);

		expect(icons[0]).not.toHaveClass('active');
		expect(icons[1]).toHaveClass('active');

		const EXPECTED_ACTIVE_SEGMENT_INDEX = 4;

		assertSemiActiveSegments([EXPECTED_ACTIVE_SEGMENT_INDEX - 1, EXPECTED_ACTIVE_SEGMENT_INDEX + 1]);
	});

	describe('When value is less than optimum', async () => {
		it('Should render with correct active and semi-active segments, icon and current segment', async () => {
			brightnessMeterBaseline({ value: -1, optimum: 0, min: -5, max: 5 }, { expectedActiveSegments: 3 });

			const icons = await screen.findAllByTestId(ICON_TEST_ID);

			expect(icons[0]).toHaveClass('active');
			expect(icons[1]).not.toHaveClass('active');

			const EXPECTED_ACTIVE_SEGMENT_INDEX = 2;

			assertSemiActiveSegments([EXPECTED_ACTIVE_SEGMENT_INDEX - 1, EXPECTED_ACTIVE_SEGMENT_INDEX + 1]);
		});
	});

	describe('When value is equal to min', () => {
		it('Should render with a single first active, one semi-active and current segments', () => {
			brightnessMeterBaseline({ value: 0, min: 0, optimum: 0.5 }, { expectedActiveSegments: 1 });

			const SECOND_SEGMENT_INDEX = 1;

			assertSemiActiveSegments([SECOND_SEGMENT_INDEX]);
		});
	});

	describe('When value is equal to max', () => {
		it('Should render with all active segments, one semi-active and last current segment', () => {
			brightnessMeterBaseline({ value: 1, max: 1, optimum: 0.5 }, { expectedActiveSegments: N_SEGMENTS });

			const SECOND_LAST_SEGMENT_INDEX = N_SEGMENTS - 2;

			assertSemiActiveSegments([SECOND_LAST_SEGMENT_INDEX]);
		});
	});

	describe('When value is less than min', () => {
		it('Should render with a single first active, one semi-active and current segments', () => {
			brightnessMeterBaseline({ value: -1, min: 0, optimum: 0.5 }, { expectedActiveSegments: 1 });

			const SECOND_SEGMENT_INDEX = 1;

			assertSemiActiveSegments([SECOND_SEGMENT_INDEX]);
		});
	});

	describe('When value is greater than max', () => {
		it('Should render with all active segments, one semi-active and last current segment', () => {
			brightnessMeterBaseline({ value: 2, max: 1, optimum: 0.5 }, { expectedActiveSegments: N_SEGMENTS });

			const SECOND_LAST_SEGMENT_INDEX = N_SEGMENTS - 2;

			assertSemiActiveSegments([SECOND_LAST_SEGMENT_INDEX]);
		});
	});

	describe('When placed in small container', () => {
		it('Should render in a compact style', () => {
			window.innerWidth = LARGE_BREAKPOINT + 1;

			fireEvent(window, new Event('resize'));
			render(BrightnessMeter, { value: 1, optimum: 1 });

			expect(screen.getByRole('meter')).not.toHaveClass('large');
		});
	});

	function brightnessMeterBaseline(
		props: ComponentProps<BrightnessMeter>,
		{ expectedActiveSegments }: { expectedActiveSegments: number }
	) {
		render(BrightnessMeter, props);

		assertActiveSegments(expectedActiveSegments);

		const CURRENT_SEGMENT_INDEX = expectedActiveSegments - 1;

		assertCurrentSegment(CURRENT_SEGMENT_INDEX);
	}

	function getSegments() {
		return screen.getByTestId(SEGMENTS_TEST_ID).querySelectorAll('div');
	}

	function assertActiveSegments(nActiveSegments: number) {
		getSegments().forEach((segment, i) => {
			if (i < nActiveSegments) {
				expect(segment).toHaveClass('active');
			} else {
				expect(segment).not.toHaveClass('active');
			}
		});
	}

	function assertSemiActiveSegments(semiActiveSegmentIndexes: number[]) {
		const semiActiveSegmentIndexesMap = Object.fromEntries(semiActiveSegmentIndexes.map((i) => [i, true]));

		getSegments().forEach((segment, i) => {
			if (semiActiveSegmentIndexesMap[i]) {
				expect(segment).toHaveClass('semi-active');
			} else {
				expect(segment).not.toHaveClass('semi-active');
			}
		});
	}

	function assertCurrentSegment(activeSegmentIndex: number) {
		expect(getSegments()[activeSegmentIndex]).toHaveClass('current');
	}
});
