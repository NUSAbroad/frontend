export interface IComboboxProps<T> {
  options: T[];
  placeholder?: string;
  filterOptions: (filter: string) => T[];
  handleSelect: (option: T) => void;
  isOptionSelected?: (option: T) => boolean;
  optionComponent: (props: IListboxOptionProps<T>) => ReactElement | null;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

export interface IListboxProps<T> {
  options: T[];
  isExpanded?: boolean;
  activeIndex: number;
  handleSelect: (option: T) => void;
  isOptionSelected?: (option: T) => boolean;
  optionComponent: (props: IListboxOptionProps<T>) => ReactElement | null;
}

export interface IListboxOptionProps<T> {
  option: T;
  index: number;
  activeIndex: number;
  handleSelect: (option: T) => void;
  isOptionSelected?: (option: T) => boolean;
}
