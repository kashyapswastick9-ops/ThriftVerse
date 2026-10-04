import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag
      className={clsx(
        'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10',
        className
      )}
    >
      {children}
    </Tag>
  );
}
