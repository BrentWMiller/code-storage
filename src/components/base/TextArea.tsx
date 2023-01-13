import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

// hooks
import useSettings from '../../hooks/context/useSettings';

// components
import { FieldWrapper } from './FieldWrapper';

type TextAreaProps = {
  className?: string;
  children?: React.ReactNode;
  name: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  [x: string]: any;
};

const TextArea = ({ className, children, name, required, onChange, label, props }: TextAreaProps) => {
  const { register } = useFormContext();
  const {
    settings: { accentColor },
  } = useSettings();

  return (
    <FieldWrapper {...{ name, label, required }}>
      <textarea
        {...register(name, { onChange, required: required ? 'This field is required' : false })}
        className={clsx(
          className,
          'bg-theme-input py-2 px-3 font-normal rounded-lg text-white',
          `focus:ring-2 outline-none ring-accent-${accentColor}-500`
        )}
        spellCheck={false}
        {...props}
      >
        {children}
      </textarea>
    </FieldWrapper>
  );
};

export default TextArea;
