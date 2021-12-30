/**
 * @description Creates an HSL string that can be used in a .css file.
 * @param hsl Object with properties h (hue), s (saturation) and l (luminance). Values must be of type Number.
 * @returns CSS formatted string of HSL values.
 */
export function hslToCss(hsl: HSL): string {
  const { h, s, l } = hsl;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function formatContrastRatio(ratio: number) {
  const asFloat = ratio.toFixed(1);
  const isInt = Number.isInteger(parseFloat(asFloat));

  return `${isInt ? Math.floor(ratio) : asFloat}:1`;
}
