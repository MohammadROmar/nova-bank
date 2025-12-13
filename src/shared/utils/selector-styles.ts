import clsx from 'clsx';
import { GroupBase, type ClassNamesConfig } from 'react-select';

type SelectorStyles = ClassNamesConfig<any, false, GroupBase<any>> | undefined;

export const selectorStyles: SelectorStyles = {
  control: ({ isFocused, isDisabled }) =>
    clsx(
      'focus:ring-primary! transition-none! w-full! cursor-pointer! rounded-2xl! border! border-gray-200! bg-white! focus:ring-2! focus:outline-0! lg:text-sm! lg:bg-background!',
      isFocused && 'outline-2! outline-primary!',
      isDisabled && 'opacity-60! ',
    ),
  menu: () =>
    'rounded-2xl! bg-background! overflow-x-hidden! text-current! border border-gray-200!',
  option: ({ isSelected, isFocused }) =>
    isSelected
      ? 'bg-primary/85!'
      : isFocused
        ? 'bg-primary/25! cursor-pointer!'
        : '',
  singleValue: () => 'text-current!',
};
