import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  name: string;
  label?: string;
  children: React.ReactNode;
  required?: boolean;
};

export const FieldWrapper = ({ name, label, children, required }: Props) => {
  const { formState } = useFormContext();
  const { errors } = formState;
  if (!label)
    return (
      <div>
        {children}
        <ErrorMessage errors={errors} name={name} render={({ message }) => <span className='text-sm text-red-400'>{message}</span>} />
      </div>
    );
  return (
    <label className='flex flex-col gap-1 text-gray-200 font-medium'>
      <span>
        {label}
        {required && <strong className='font-normal'>*</strong>}
      </span>
      {children}
      <ErrorMessage errors={errors} name={name} render={({ message }) => <span className='text-sm text-red-400'>{message}</span>} />
    </label>
  );
};
