## BrightnessMeter component

### Basic use

```svelte
<BrightnessMeter value={0.33} optimum={0.5} min={-1} max={1} />
```

### Props

`value: number` - current value. Active meter segment is calculated using the `value` and `min`-`max` range. If `value` is greater than `max`, the last segment will be active, if `value` is less than `min`, the first segment will be active

`optimum: number` - optimum value. If `value` is less than `optimum`, the icon on the left will glow, and the icon on the right will dim, and vice-versa when `value` is greater than or equal to `optimum`

`min: number` - minimum scale value. Should not be greater than `max` value (in other case a warning will be thrown)

`max: number` - maximum scale value. Should not be less than `min` value (in other case a warning will be thrown)
