export type CellCallback<T, ReturnType = any> = (
	colIndex: number,
	rowIndex: number,
	row: T,
	headers: TableHeader<T>[],
	data: T[]
) => ReturnType;
export type RowCallback<T, ReturnType = any> = (
	row: T,
	index: number,
	data: T[]
) => ReturnType;

export type TableHeader<T> = {
	field: string | RowCallback<T>;
	display: React.ReactNode;
	minWidth?: number;
};
export type TableAction<T> = {
	name: React.ReactNode | RowCallback<T>;
	callback?: RowCallback<T>;
	hidden?: boolean | RowCallback<T>;
};
export type TableActionCallback<T> = (
	row: T,
	rowIndex: number
) => TableAction<T>[];
