'use client';

import dynamic from 'next/dynamic';
import type {
  ComponentPropsWithRef,
  PropsWithChildren,
  ReactNode,
} from 'react';

export type ModalProps = ComponentPropsWithRef<'dialog'> & {
  title: string;
  description?: string;
  titleStyles?: string;
  icon?: ReactNode;
} & PropsWithChildren;

const Dialog = dynamic(() => import('./dialog'), { ssr: false });

export default function Modal(props: ModalProps) {
  return <Dialog {...props} />;
}
