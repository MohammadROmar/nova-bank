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
      textColor = 'text-yellow-600';
      bgColor = 'bg-yellow-200';
      break;
    case 'Suspended':
      textColor = 'text-slate-600';
      bgColor = 'bg-slate-200';
      break;
    case 'Closed':
      textColor = 'text-red-600';
      bgColor = 'bg-red-200';
      break;
  }

  return `${textColor} ${bgColor}`;
}
