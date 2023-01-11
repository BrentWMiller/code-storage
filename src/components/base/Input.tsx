import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
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

  return (
    <FieldWrapper {...{ name, label, required }}>
      <input
        {...register(name, { onChange, required: required ? 'This field is required' : false })}
        type={type}
        className={clsx(className, 'bg-theme-input py-2 px-3 font-normal rounded-lg text-white')}
        step={type === 'number' ? 'any' : undefined}
        spellCheck={false}
        {...props}
      />
    </FieldWrapper>
  );
};

export default Input;
