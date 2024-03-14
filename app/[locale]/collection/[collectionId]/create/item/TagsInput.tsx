import { cn } from "@/lib/utils/utils";
import CreatableSelect from "react-select/creatable";

const multiValueStyles =
  "bg-sky-500 rounded items-center py-0 text-sm text-slate-900 dark:text-slate-200 pl-2 pr-2 gap-1.5 mr-1";
const multiValueLabelStyles = "leading-6 py-0.5";

const controlStyles = {
  base: "p-1 px-2 rounded bg-slate-100 dark:bg-slate-800 dark:text-slate-200 text-slate-600 font-medium text-sm border-2 dark:border-slate-700  outline-none",
  focus: "dark:border-slate-600 border-slate-400",
  nonFocus: "outline-none",
};
const placeholderStyles = "dark:text-slate-500 text-slate-400 p-2 px-2";
const selectInputStyles = "pl-2 py-2";
const valueContainerStyles = "";
const indicatorsContainerStyles = "";
const indicatorSeparatorStyles = "bg-neutral-600 hidden";
const dropdownIndicatorStyles = "px-2 text-neutral-400";

const menuStyles =
  "p-1 mt-2 border-2 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800 rounded";
const singleValueStyles = "px-2";
const optionStyles = {
  base: "hover:cursor-pointer p-2 py-2 rounded dark:hover:bg-slate-700/50 hover:bg-slate-200 dark:text-slate-200 text-slate-600 font-medium first:mt-0 mt-1",
  focus: "dark:bg-slate-700/50",
  selected: "dark:bg-slate-700 bg-slate-400",
};

const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

export type ReactSelectTypes = {
  value: string;
  label: string;
};

export type OnChangeFunction = (value: ReactSelectTypes) => void;

const TagsInput = (props: any) => {
  return (
    <CreatableSelect
      placeholder="Add tags"
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
      isMulti
      options={[
        {
          value: "tag1",
          label: "Game",
        },
        {
          value: "tag2",
          label: "Movie",
        },
      ]}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base,
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          cn(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base,
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      {...props}
    />
  );
};

export default TagsInput;
