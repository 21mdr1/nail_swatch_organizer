import { View, Button } from 'reshaped';
import type { MouseEvent, KeyboardEvent } from 'react';

type clickHandler = (e: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;

export default function TwoButtons({ primaryLabel, secondaryLabel, primaryOnClick, secondaryOnClick, fullWidth = false, ...props }: {
  primaryLabel: string,
  secondaryLabel: string,
  primaryOnClick?: clickHandler,
  secondaryOnClick?: clickHandler,
  fullWidth: boolean,
}) {
  return (
    <View 
      align="center"
      gap={2}
      direction="row-reverse"
      {...props}
    >
      <Button 
        color="primary"
        onClick={primaryOnClick}
        className={fullWidth && 'long'}
      >
        { primaryLabel }
      </Button>
      <Button
        onClick={secondaryOnClick}
        className={fullWidth && 'long'}
      >
        { secondaryLabel }
      </Button>
    </View>
  );
}