import Draggable from 'react-draggable';
import { Actionable, Popover, Text, Button, useToggle, View } from 'reshaped';
import { useState, useRef } from 'react';

import AddModal from '../components/AddModal/AddModal';
import { xyToCoords, coordsToXY, updateSwatch, deleteSwatch } from '../utils/storageUtils';


export default function DraggbleSwatch({ swatchInfo, isDraggable, updateSwatchCoords, swatches, setSwatches }) {
  const [ position, setPosition ] = useState(coordsToXY(swatchInfo));
  const [ zIndex, setZIndex ] = useState(1);
  const { active, activate, deactivate } = useToggle(false);
  const nodeRef = useRef(null);

  return (
    <>
    <Draggable
      nodeRef={nodeRef}
      disabled={!isDraggable}
      position={position}
      onStart={() => setZIndex(99)}
      onDrag={(_, data) => setPosition({ x: data.x, y: data.y })}
      onStop={(_, data) => {
        let coords = xyToCoords(data);
        for(let item of swatches) {
          if( coords.col === item.col && coords.row === item.row) {
            coords = swatchInfo;
            break;
          }
        }
        setPosition(coordsToXY(coords));
        updateSwatchCoords(coords);
        setZIndex(1);
      }}
    >
      <div
        ref={nodeRef}
        style={{
          cursor: isDraggable ? 'grab' : 'pointer',
          backgroundColor: swatchInfo.colorChoice === "1" ?`#${swatchInfo.color}` : 'white',
          backgroundImage: swatchInfo.colorChoice === "2" ? `url(${URL.createObjectURL(swatchInfo.file[0])})` : "",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width:'40px',
          borderRadius: '10px',
          zIndex: zIndex,
        }} 
        className='card'
      >
        { !isDraggable &&
          (<Popover>
            <Popover.Trigger>
              {(attributes) => (
                <Actionable attributes={attributes} className={`card`} />
              )}
            </Popover.Trigger>
            <Popover.Content>
              <View paddingStart={2} paddingEnd={2}>
                <Text variant="featured-6" align='center'>{swatchInfo.name}</Text>
                <View direction="row" gap={2} align="center" paddingTop={2} paddingBottom={1}>
                  <Text variant="body-1" weight="bold">Brand:</Text>
                  <Text variant="body-2">{swatchInfo.brand}</Text>
                </View>
                <Text variant="body-1" weight="bold">Notes:</Text>
                <View paddingStart={3}>
                  <Text variant="body-2">{swatchInfo.notes}</Text>
                </View>
                <View align="end">
                  <Button 
                    fullWidth
                    variant='ghost' 
                    color='primary'
                    onClick={activate}
                  > 
                    Edit 
                  </Button>
                </View>
              </View>
            </Popover.Content>
          </Popover>)
        }
      </div>
    </Draggable>
    {
      <AddModal 
        active={active}
        oldInfo={swatchInfo}
        deactivate={deactivate}
        adding={false}
        saveSwatch={(newSwatch) => updateSwatch(newSwatch, setSwatches)}
        deleteSwatch={() => deleteSwatch(swatchInfo.id, setSwatches)}
      />
    }
    </>
  );

}