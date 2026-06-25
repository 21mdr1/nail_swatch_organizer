import { RadioGroup, HiddenInput, View, Icon } from 'reshaped';
import { Check } from 'lucide-react';

const defaultColors = ["f2cfc9", "dea2a6", "dd785b", "ea994d", 
                    "efd353", "c4c66a", "b8caa5", "b4d8d4",
                    "80a4aa", "d2cbe3", "a299b8", "c4b28e"];

export default function ColorPicker({ value, onChange }) {
  return (
    <RadioGroup
      name="color"
      value={value}
      onChange={onChange}
    >
      <View direction="row" gap={4} align="stretch" paddingTop={5} paddingBottom={5}>
        {defaultColors.map(color => (
          <label
            key={color}
            style={{
              backgroundColor: `#${color}`,
              borderWeight: value === color ? 1 : 0,
              borderStyle: value === color ? 'solid' : '',
              borderColor: value === color ? '#5B616B' : '',
            }}
            className='color-card'
          >
            <HiddenInput type="radio" value={color} checked={value === color} />
            { (value === color) && (
              <Icon svg={Check} color="neutral-faded" size={7}/>
            )}
          </label>
        ))}
      </View>
    </RadioGroup>
  );
}