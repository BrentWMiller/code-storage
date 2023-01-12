import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

// hooks
import useSettings from '../../hooks/context/useSettings';

// components
import { FieldWrapper } from './FieldWrapper';

type InputProps = {
  type: string;
  className?: string;
  name: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  [x: string]: any;
};

const Input = ({ type, className, name, required, onChange, label, props }: InputProps) => {
  const { register } = useFormContext();
  const {
    settings: { accentColor },
  } = useSettings();

  return (
    <FieldWrapper {...{ name, label, required }}>
      <input
        {...register(name, { onChange, required: required ? 'This field is required' : false })}
        type={type}
        className={clsx(
          className,
          'bg-theme-input py-2 px-3 font-normal rounded-lg text-white',
          `focus:ring-2 outline-none ring-accent-${accentColor}`
        )}
        step={type === 'number' ? 'any' : undefined}
        spellCheck={false}
        {...props}
      />
    </FieldWrapper>
  );
};

export default Input;
