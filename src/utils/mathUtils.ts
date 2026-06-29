

function coordsToXY({ row, col }: {row: number, col: number}, mult = 40) {
  return ({x: (col * mult) - mult / 2, y: row * mult - mult / 2});
}

function xyToCoords({ x, y }: {x: number, y: number}, mult = 40) {
  let col = Math.floor((x + mult / 2) / mult);
  if ((x + mult / 2) % mult >= 20) col++;
  let row = Math.floor((y + mult / 2) / mult);
  if ((y + mult / 2) % mult >= 20) row++;
  return ({col: col > 0 ? col : 1, row: row > 0 ? row : 1});
}

export { coordsToXY, xyToCoords };