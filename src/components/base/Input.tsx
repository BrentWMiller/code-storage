import { useFormContext } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';

type InputProps = {
  type: string;
  className?: string;
  name: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  large?: boolean;
  inline?: boolean;
  [x: string]: any;
};

const Input = ({ type, className, name, required, onChange, label, large, inline, ...props }: InputProps) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper {...{ name, label, required, inline }}>
      <input
        {...register(name, { onChange, required: required ? 'This field is required' : false })}
        type={type}
        className={`w-full ${large ? 'input-lg' : 'input'} ${className || ''}`}
        step={type === 'number' ? 'any' : undefined}
        {...props}
      />
    </FieldWrapper>
  );
};

export default Input;
