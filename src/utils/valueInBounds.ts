export function valueInBounds(
	value: number,
	{ min = value, max = value }: { min: number; max?: number } | { min?: number; max: number }
) {
	if (min > max) {
		console.warn('valueInBounds: Received a min value greater than max');
	}

	return Math.max(min, Math.min(value, max));
}
