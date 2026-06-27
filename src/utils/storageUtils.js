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

async function restoreSwatches(onSuccess=() => {}, onFailure=(e,_) => console.log(e)) {
  let swatches;
  try {
    swatches = JSON.parse(await window.storage.readSwatches());
    onSuccess(swatches);
  } catch (e) {
    swatches =[];
    onFailure(e, []);
  }

  return swatches;
}

async function storeSwatches(swatches, onSuccess=() => {}, onFailure=(e,_) => console.log(e)) {
  try {
    window.storage.writeSwatches(JSON.stringify(swatches));
    onSuccess();
  } catch(e) {
    onFailure(e);
  }
}

async function addSwatch(swatch, setter=() => {}) {
  const newId = await getNextKey();

  setter(prev => {
    swatch.id =  newId;
    storeSwatches([...prev, swatch]);
    return [...prev, swatch];
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

async function getNextKey() {
  return await window.storage.getNextKey();
}

export { getNextKey, coordsToXY, xyToCoords, restoreSwatches, storeSwatches, addSwatch, updateSwatch, deleteSwatch, updateSwatchLocation }