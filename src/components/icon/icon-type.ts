export const ICON_TYPE = {
	SUN: 'SUN',
	MOON: 'MOON',
} as const;
export type IconType = (typeof ICON_TYPE)[keyof typeof ICON_TYPE];
