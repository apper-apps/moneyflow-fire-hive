import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { cn } from '@/utils/cn';

const FormField = ({ 
  label, 
  error, 
  type = 'input', 
  className,
  children,
  ...props 
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      {type === 'input' && <Input error={error} {...props} />}
      {type === 'select' && (
        <Select error={error} {...props}>
          {children}
        </Select>
      )}
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;