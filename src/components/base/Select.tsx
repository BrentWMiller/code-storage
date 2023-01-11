import clsx from 'clsx';
import { useFormContext, Controller } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';

type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  required?: boolean;
  label?: string;
  inline?: boolean;
  className?: string;
  defaultValue?: Option;
  options: Option[];
  [x: string]: any;
};

export default function Select({ name, label, required, options, defaultValue, onChange: customOnChange, inline, className, ...props }: Props) {
  const { control } = useFormContext();

  return (
    <FieldWrapper {...{ name, label, required, inline }}>
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? 'This field is required' : false }}
        render={({ field: { onChange, value, ref, ...field } }) => {
          let selected = null;
          selected = options?.find((it) => it.value === value);

          const onSelect = (e: any) => {
            const value = e.target?.value || null;

            onChange(value);
            customOnChange?.(value);
          };

          return (
            <select
              id={name}
              onChange={onSelect}
              value={selected ? selected.value : defaultValue}
              {...field}
              {...props}
              className={clsx(className, 'appearance-none text-white bg-gray-900 font-normal py-2 px-3 rounded-lg')}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        }}
      />
    </FieldWrapper>
  );
}