import { FormControl, TextField, TextArea } from 'reshaped';
import type { ChangeEvent } from 'react';

type changeHandler = (args: {name: string, value: string, event?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>}) => void

export default function FullTextField({ label, value, name, placeholder, onChange, type="normal", resize }: {
  label: string,
  value: string,
  name: string,
  placeholder: string, 
  onChange?: changeHandler,
  type: 'normal' | 'big',
  resize?: 'none' | 'auto', 
}) {
  return (
    <FormControl>
      <FormControl.Label> {label} </FormControl.Label>
      { type === "normal" && 
        <TextField
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
       />
      }
      { type === "big" && 
        <TextArea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          resize={resize}
        />
      }
      
    </FormControl>
  );
}