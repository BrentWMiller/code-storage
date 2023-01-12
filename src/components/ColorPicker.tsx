import clsx from 'clsx';
import React, { ChangeEvent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwind from '../../tailwind.config.js';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  activeValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ColorPicker = ({ label, name, required, activeValue, onChange }: Props) => {
  const { control } = useFormContext();
  const config = resolveConfig(tailwind);
  const colors = config?.theme?.colors;
  const accentColors = typeof colors === 'object' ? colors?.accent : null;

  return (
    <div role='radiogroup' aria-labelledby='id-color-picker'>
      <p id='id-color-picker' className='flex flex-col mb-3 text-gray-200 font-medium'>
        {label}
      </p>
      <div className='flex items-center gap-3'>
        {Object.keys(accentColors).map((color) => {
          return (
            <Controller
              key={color}
              control={control}
              name={name}
              rules={{ required: required ? 'This field is required' : false }}
              render={({ field: { onChange, value, ref, ...field } }) => {
                let selected = null;
                selected = Object.keys(accentColors)?.find((it) => it === value);

                return (
                  <label
                    className={clsx(
                      'block w-6 h-6 rounded-full',
                      `bg-accent-${color} hover:opacity-80`,
                      color === activeValue && 'ring ring-white ring-offset-2 ring-offset-theme-bg',
                      color === selected && `ring ring-accent-${color} ring-offset-2 ring-offset-theme-bg`
                    )}
                    title={color}
                  >
                    <input type='radio' className='hidden' value={color} {...field} onChange={onChange} />
                  </label>
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
