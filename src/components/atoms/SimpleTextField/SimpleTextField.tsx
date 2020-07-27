import React from 'react';
import TextField from '@material-ui/core/TextField';

type SimpleTextFieldType = {
  name: string;
  labelName: string;
  variantType: 'filled' | 'outlined' | 'standard';
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
};

const SimpleTextField = ({
  name,
  labelName,
  variantType,
  autoComplete,
  value,
  onChange,
}: SimpleTextFieldType) => (
  <TextField
    variant={variantType}
    required
    fullWidth
    value={value}
    name={name}
    onChange={e => onChange(e.target.value)}
    label={labelName}
    type={name}
    id={name}
    autoComplete={autoComplete}
  />
);

export default SimpleTextField;
