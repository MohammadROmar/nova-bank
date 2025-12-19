import clsx from 'clsx';
import { memo, type ComponentPropsWithoutRef } from 'react';
import Deposit from './deposit';

function WithdrawIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return <Deposit {...props} className={clsx(props.className, 'rotate-180')} />;
}

export default memo(WithdrawIcon);
