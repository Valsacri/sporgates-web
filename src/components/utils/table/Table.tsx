'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
	CellCallback,
	RowCallback,
	TableAction,
	TableActionCallback,
	TableHeader,
} from '@/components/utils/table/table.types';
import Loader from '../Loader';

interface Props<T> {
	headers: TableHeader<T>[];
	data: T[];
	actions?: TableAction<T>[] | TableActionCallback<T>;
	loading?: boolean;
	onRowClick?: (row: T, index: number) => void;
	height?: number | string;
	maxHeight?: number | string;
	className?: string;
	rowClassName?: string | RowCallback<T>;
	headersClassName?: string;
	noData?: React.ReactNode;
	minColumnWidth?: number | CellCallback<T>;
	actionsMinWidth?: number;
}

export const Table = <T,>({
	headers,
	data,
	actions = [],
	loading,
	onRowClick,
	height,
	maxHeight,
	className,
	rowClassName,
	headersClassName,
	noData = 'No data',
	minColumnWidth = 200,
	actionsMinWidth,
}: Props<T>) => {
	const isActions = !!actions.length;

	const handleClickAction = (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
		row: T,
		index: number,
		callback?: (row: T, index: number, data: T[]) => void
	) => {
		e.stopPropagation();
		callback?.(row, index, data);
	};

	const getFieldValue = (
		row: T,
		index: number,
		field: string | RowCallback<T>
	) => {
		return typeof field === 'function'
			? field(row, index, data)
			: (row as any)[field];
	};

	const getActions = (row: T, index: number) => {
		return typeof actions === 'function' ? actions(row, index) : actions;
	};

	return (
		<div
			className={twMerge('overflow-x-auto w-full h-full text-sm', className)}
			style={{ height, maxHeight }}
		>
			<table className='w-full'>
				<thead
					className={twMerge('top-0 sticky', headersClassName)}
					style={{ boxShadow: '0px -1px 0px 0px lightgray inset' }}
				>
					<tr className=''>
						{headers.map((header, headerIndex) => (
							<td
								key={headerIndex}
								className='p-3 text-text-secondary-dark font-semibold'
								style={{ minWidth: header.minWidth }}
							>
								{header.display}
							</td>
						))}
						{isActions && <td className='p-3'></td>}
					</tr>
				</thead>

				<tbody className='pt-3'>
					{loading ? (
						<tr>
							<td className='p-3' colSpan={headers.length}>
								<div className='flex justify-center'>
									<Loader className='size-10' />
								</div>
							</td>
						</tr>
					) : data.length === 0 ? (
						<tr>
							<td className='p-3'>{noData}</td>
						</tr>
					) : (
						data.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								className={twMerge(
									onRowClick && 'cursor-pointer hover:bg-gray-200/50',
									typeof rowClassName === 'function'
										? rowClassName(row, rowIndex, data)
										: rowClassName
								)}
								onClick={() => onRowClick?.(row, rowIndex)}
							>
								{headers.map((header, headerIndex) => (
									<td
										key={headerIndex}
										className='align-top p-3'
										style={{
											minWidth:
												header.minWidth ||
												(typeof minColumnWidth === 'function'
													? minColumnWidth(
															headerIndex,
															rowIndex,
															row,
															headers,
															data
													  )
													: minColumnWidth),
										}}
									>
										{getFieldValue(row, headerIndex, header.field)}
									</td>
								))}

								{isActions && (
									<td
										className='flex gap-3 align-top p-3'
										style={{
											minWidth:
												actionsMinWidth ||
												(typeof minColumnWidth === 'function'
													? minColumnWidth(
															headers.length,
															rowIndex,
															row,
															headers,
															data
													  )
													: minColumnWidth),
										}}
									>
										{getActions(row, rowIndex).map(
											({ name, callback, hidden }, actionIndex) =>
												!(typeof hidden === 'function'
													? hidden(row, rowIndex, data)
													: hidden) && (
													<span
														key={actionIndex}
														className='underline cursor-pointer whitespace-nowrap'
														onClick={(e) =>
															handleClickAction(e, row, rowIndex, callback)
														}
													>
														{typeof name === 'function'
															? name(row, rowIndex, data)
															: name}
													</span>
												)
										)}
									</td>
								)}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};
