import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  name: string;
  label?: string;
  children: React.ReactNode;
  required?: boolean;
  inline?: boolean;
};

export const FieldWrapper = ({ name, label, children, required, inline }: Props) => {
  const { formState } = useFormContext();
  const { errors } = formState;
  if (!label)
    return (
      <div>
        {children}
        <ErrorMessage errors={errors} name={name} render={({ message }) => <span className='text-sm text-red-600'>{message}</span>} />
      </div>
    );
  return (
    <label className={`flex ${inline ? 'flex-row items-center' : 'flex-col'} gap-1 text-gray-700`}>
      <span className={inline ? 'w-24 flex-shrink-0 text-sm font-medium' : ''}>
        {label}
        {required && <strong className='font-normal text-red-600'>*</strong>}
      </span>
      {children}
      <ErrorMessage errors={errors} name={name} render={({ message }) => <span className='text-sm text-red-600'>{message}</span>} />
    </label>
  );
};
