import clsx from 'clsx';
import { GroupBase, type ClassNamesConfig } from 'react-select';

type SelectorStyles = ClassNamesConfig<any, false, GroupBase<any>> | undefined;

export const selectorStyles: SelectorStyles = {
  control: (state) =>
    clsx(
      'focus:ring-primary! transition-none! w-full! rounded-2xl! border! border-gray-200! bg-white! focus:ring-2! focus:outline-0! lg:text-sm! lg:bg-background!',
      state.isFocused && 'outline-2! outline-primary!',
    ),
  menu: () =>
    'rounded-2xl! bg-background! overflow-x-hidden! text-current! border border-gray-200!',
  option: (state) =>
    state.isSelected
      ? 'bg-primary/85!'
      : state.isFocused
        ? 'bg-primary/25! cursor-pointer!'
        : '',
  singleValue: () => 'text-current!',
};
