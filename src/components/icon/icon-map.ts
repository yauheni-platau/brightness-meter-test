import type { IconType } from './icon-type';
import { ICON_TYPE } from './icon-type';

export const ICON_MAP = Object.fromEntries(
	(
		[
			[ICON_TYPE.MOON, () => import('./icons/moon.svg?raw')],
			[ICON_TYPE.SUN, () => import('./icons/sun.svg?raw')],
		] as const
	).map(([iconName, importFn]) => [iconName, () => importFn().then((iconModule) => iconModule.default)])
) as Record<IconType, () => Promise<string>>;
