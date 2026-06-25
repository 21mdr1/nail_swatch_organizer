import { useState, useEffect } from 'react';
import { Reshaped, useToggle } from "reshaped";
import { getThemeCSS, baseThemeDefinition, generateThemeColors } from "@reshaped/theming";
import { useWindowSize } from './utils/useWindowSize';

import BackgroundGrid from './components/BackgroundGrid/BackgroundGrid';
import AddModal from './components/AddModal/AddModal';
import TwoButtons from './fragments/TwoButtons';
import SwatchGrid from './components/SwatchGrid/SwatchGrid';

import { restoreSwatches, addSwatch } from './utils/storageUtils';

const css = getThemeCSS("myTheme", {
  ...baseThemeDefinition,
  color: {
    ...baseThemeDefinition.color,
    ...generateThemeColors({ 
      primary: "#B19CD8",
      critical: '#C98081',
      positive: '#C9d0AC',
      neutral: '#C9D0DC',
   }),
  },
});

export default function App() {
  const { active, activate, deactivate } = useToggle(false);
  const [ swatches, setSwatches ] = useState([]);
  const [ isEditing, setIsEditing ] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    restoreSwatches(setSwatches, setSwatches);
  }, [restoreSwatches, setSwatches]);

  return (
    <Reshaped theme="myTheme">
      <style>{css}</style>
      <div style={{backgroundColor: 'white', width: '100vw', height:'100vh', overflow: 'hidden'}}>
        <BackgroundGrid />
        <SwatchGrid swatches={ swatches } setSwatches={ setSwatches } isEditing={ isEditing } />
        <TwoButtons 
          primaryLabel="Add"
          primaryOnClick={activate}
          secondaryLabel={isEditing ? "Save" : "Edit"}
          secondaryOnClick={isEditing ? () => {setIsEditing(false)} : () => setIsEditing(true)}
          position="absolute"
          insetBottom={2}
          insetEnd={2}
        />
        <AddModal 
          active={active} 
          deactivate={deactivate} 
          saveSwatch={(newSwatch) => {
            let selected = false;
            for(let i = 1; i <= Math.floor((height - 20) / 40); i++) {
              for(let j = 1; j <= Math.floor((width - 20) / 40); j++) {
                let isFree = true;
                for(let swatch of swatches) {
                  if (swatch.row === i && swatch.col === j) {
                    isFree = false;
                    break;
                  }
                }
                if(isFree) {
                  newSwatch.col = j;
                  newSwatch.row = i;
                  selected = true;
                  break;
                }
              }
              if(selected) {
                break;
              }
            }
            addSwatch(newSwatch, setSwatches);
          }}
        />
      </div>
    </Reshaped>
  )
}