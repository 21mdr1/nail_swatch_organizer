import { FormControl, TextField, TextArea } from 'reshaped';

export default function FullTextField({ label, value, name, placeholder, onChange, type="normal", resize }) {
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