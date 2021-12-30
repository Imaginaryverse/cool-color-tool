import namer from 'color-namer';

export function getColorName(hex: HEX) {
  const names = namer(hex, { pick: ['ntc', 'pantone'] });

  const ntc = names.ntc[0];
  const pantone = names.pantone[0];

  if (ntc.name === pantone.name) return ntc.name;

  const closest = [ntc, pantone].sort((a, b) => a.distance - b.distance)[0];

  return closest.name;
}
