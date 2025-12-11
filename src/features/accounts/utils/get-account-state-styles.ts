// text-green-600
// bg-green-200
// text-warning-600
// bg-warning-200
// text-red-600
// bg-red-200
// text-slate-600
// bg-slate-200

import { AccountState } from '../models/state';

export function getAccountStateStyles(state: AccountState) {
  let textColor = '';
  let bgColor = '';

  switch (state) {
    case 'Active':
      textColor = 'text-green-600';
      bgColor = 'bg-green-200';
      break;
    case 'Frozen':
      textColor = 'text-warning-600';
      bgColor = 'bg-warning-200';
      break;
    case 'Suspended':
      textColor = 'text-red-600';
      bgColor = 'bg-red-200';
      break;
    case 'Closed':
      textColor = 'text-slate-600';
      bgColor = 'bg-slate-200';
      break;
  }

  return `${textColor} ${bgColor}`;
}
