import { Control, FieldPath, Form } from 'react-hook-form';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');

interface CustomInputProps {
  name: FieldPath<z.infer<typeof formSchema>>;
  placeholder: string;
  label: string;
  control: Control<z.infer<typeof formSchema>>;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel className='form-label'>{label}</FormLabel>
          <div className='flex w-full flex-col'>
            <FormControl>
              <Input
                placeholder={placeholder}
                className='input-class'
                {...field}
                type={name === 'password' ? 'password' : 'text'}
              />
            </FormControl>
            <FormMessage className='form-message mt-2'></FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
