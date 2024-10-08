export type Color =
	| 'primary'
	| 'accent'
	| 'secondary'
	| 'transparent'
	| 'success'
	| 'warning'
	| 'info'
	| 'danger'
	| 'white';

export const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
export type Day = (typeof DAYS)[number];
