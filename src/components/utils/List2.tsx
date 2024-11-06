// List.tsx
'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListProps {
  children?: ReactNode;
  className?: string;
}

function List2({ children, className }: ListProps) {
  return (
    <div className={twMerge('space-y-1', className)}>
      {children}
    </div>
  );
}

export default List2;
