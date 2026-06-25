function coordsToXY({ row, col }, multiplier = 40) {
  return ({x: (col * multiplier) - multiplier / 2, y: row * multiplier - multiplier / 2})
}

function xyToCoords({ x, y }, multiplier = 40) {
  let col = Math.floor((x + multiplier / 2) / multiplier);
  if ((x + multiplier / 2) % multiplier >= 20) col++;
  let row = Math.floor((y + multiplier / 2) / multiplier);
  if ((y + multiplier / 2) % multiplier >= 20) row++;
  return ({col: col > 0 ? col : 1, row: row > 0 ? row : 1})
}

function restoreSwatches(onSuccess=() => {}, onFailure=() => {}) {
  try {
    onSuccess([
      {id: 1, color: 'dea2a6', col: 5, row: 5, colorChoice: "1", file: [], name: 'test', brand: 'test', notes: 'test'},
      {id: 2, color: 'c4c66a', col: 1, row: 10, colorChoice: "1", file: [], name: 'test', brand: 'test', notes: 'test'},
      {id: 3, color: 'b4d8d4', col: 13, row: 10, colorChoice: "1", file: [], name: 'test', brand: 'test', notes: 'test'},
    ]);
  } catch(e) {
    onFailure([
      {id: 1, color: 'dea2a6', col: 5, colorChoice: "1", row: 5, file: [], name: 'test', brand: 'test', notes: 'test'},
      {id: 2, color: 'c4c66a', col: 1, colorChoice: "1", row: 10, file: [], name: 'test', brand: 'test', notes: 'test'},
      {id: 3, color: 'b4d8d4', col: 13, colorChoice: "1", row: 10, file: [], name: 'test', brand: 'test', notes: 'test'},
    ]);
  }

  return [];
}

function storeSwatches(swatches, onSuccess=() => {}, onFailure=() => {}) {
  console.log("Saved")
}

function addSwatch(swatch, setter=() => {}) {
  setter(prev => {
    swatch.id = getNextKey();
    storeSwatches([...prev, swatch]);
    return [...prev, swatch]
  });
}

function updateSwatch(swatch, setter=() => {}) {
  setter(prev => {
    const rest = prev.filter(item => item.id !== swatch.id);
    const newOne = [swatch, ...rest];
    storeSwatches(newOne);
    return newOne;
  });
}

function deleteSwatch(swatchId, setter=() => {}) {
  setter(prev => {
    const rest = prev.filter(item => item.id !== swatchId);
    storeSwatches(rest);
    return [...rest];
  })
}

function updateSwatchLocation(swatchId, newLocation, setter=() => {}) {
  setter(prev => {
    const old = prev.find(item => item.id === swatchId);
    const rest = prev.filter(item => item.id !== swatchId);
    const newOne = [{...old, col: newLocation.col, row: newLocation.row}, ...rest];
    storeSwatches(newOne);
    return newOne;
  });
}

let key = 3;
function getNextKey() {
  key++;
  return key;
}

export { getNextKey, coordsToXY, xyToCoords, restoreSwatches, storeSwatches, addSwatch, updateSwatch, deleteSwatch, updateSwatchLocation }