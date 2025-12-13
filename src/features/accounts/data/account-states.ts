import checkMark from '@/assets/icons/check-mark';
import lock from '@/assets/icons/lock';
import pause from '@/assets/icons/pause';
import snow from '@/assets/icons/snow';

export const accountStates = [
  {
    id: 0,
    name: 'Active',
    description: 'Account fully usable.',
    icon: checkMark,
  },
  {
    id: 1,
    name: 'Frozen',
    description: 'Templorarily locked, no transactions.',
    icon: snow,
  },
  {
    id: 2,
    name: 'Suspended',
    description: 'Disabled due to restrictions.',
    icon: pause,
  },
  {
    id: 3,
    name: 'Closed',
    description: 'Permanentl deactivated account.',
    icon: lock,
  },
];
