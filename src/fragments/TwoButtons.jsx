import { View, Button } from 'reshaped';

export default function TwoButtons({ primaryLabel, secondaryLabel, primaryOnClick, secondaryOnClick, fullWidth=false, ...props }) {
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