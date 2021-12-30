type HSL = {
  h: number;
  s: number;
  l: number;
};

type RGB = {
  r: number;
  g: number;
  b: number;
};

type CMYK = {
  c: number;
  m: number;
  y: number;
  k: number;
};

type HEX = string;

type TColor = {
  hex: HEX;
  rgb: RGB;
  hsl: HSL;
  isLocked: boolean;
};

type TPalette = Array<TColor>;

type TColorFormat = 'hex' | 'rgb' | 'hsl';
