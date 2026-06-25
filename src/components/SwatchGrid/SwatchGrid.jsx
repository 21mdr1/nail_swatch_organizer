import './SwatchGrid.css';
import { View } from 'reshaped';
import { updateSwatchLocation } from '../../utils/storageUtils';

import DraggableSwatch from '../../fragments/DraggableSwatch';

export default function SwatchGrid({ swatches, isEditing, setSwatches }) {

  return (
    <View width={'100vw'} height={'100vh'} position={'absolute'} insetTop={0} insetStart={0}>
      {swatches.map((swatch, _) => 
        <DraggableSwatch
          setSwatches={setSwatches}
          swatchInfo={swatch}
          key={swatch.id}
          isDraggable={isEditing}
          swatches={swatches}
          updateSwatchCoords={(newLocation) => updateSwatchLocation(swatch.id, newLocation, setSwatches)}
          disabled={isEditing}
        />
      )}
    </View>
  );
}