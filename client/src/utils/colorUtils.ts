import convert from 'color-convert';
import { getRandomNum } from './numberUtils';
import { shuffleArray } from './arrayUtils';

export function getRandomHsl(): HSL {
  const h = getRandomNum(0, 360);
  const s = getRandomNum();
  const l = getRandomNum();

  return { h, s, l };
}

export function hslToHex(hsl: HSL): HEX {
  const { h, s, l } = hsl;
  const hex = '#' + convert.hsl.hex([h, s, l]);
  return hex;
}

export function hslToRgb(hsl: HSL): RGB {
  const { h, s, l } = hsl;
  const rgbArr = convert.hsl.rgb([h, s, l]);
  return {
    r: rgbArr[0],
    g: rgbArr[1],
    b: rgbArr[2],
  };
}

export function hexToRgb(hexStr: HEX): RGB {
  let hex = hexStr[0] === '#' ? hexStr.substring(1) : hexStr;
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + (hex[1] + hex[1]) + (hex[2] + hex[2]);
  }

  const rgbArr = convert.hex.rgb(hex);
  return {
    r: rgbArr[0],
    g: rgbArr[1],
    b: rgbArr[2],
  };
}

export function rgbToHsl(rgb: RGB): HSL {
  const { r, g, b } = rgb;
  const hslArr = convert.rgb.hsl([r, g, b]);
  return {
    h: hslArr[0],
    s: hslArr[1],
    l: hslArr[2],
  };
}

export function rgbToHex(rgb: RGB): HEX {
  const { r, g, b } = rgb;
  const hex = '#' + convert.rgb.hex([r, g, b]);
  return hex;
}

export function hexToHsl(hexStr: HEX): HSL {
  let hex = hexStr[0] === '#' ? hexStr.substring(1) : hexStr;
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + (hex[1] + hex[1]) + (hex[2] + hex[2]);
  }

  const hslArr = convert.hex.hsl(hex);
  return {
    h: hslArr[0],
    s: hslArr[1],
    l: hslArr[2],
  };
}

export function rgbToCmyk(rgb: RGB): CMYK {
  const { r, g, b } = rgb;

  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, Math.min(m, y));

  return {
    c: isNaN(c) ? 0 : Math.round((c * 10000) / 100),
    m: isNaN(m) ? 0 : Math.round((m * 10000) / 100),
    y: isNaN(y) ? 0 : Math.round((y * 10000) / 100),
    k: isNaN(k) ? 0 : Math.round((k * 10000) / 100),
  };
}

export function contrastHue(hue: number): number {
  const degRef: number = 180;
  const offset: number = 15;
  const deg: number = getRandomNum(degRef - offset, degRef + offset);
  const exceedsRange: boolean = hue + deg > 360;
  return exceedsRange ? hue - 360 + deg : hue + deg;
}

export function harmonizeHue(hue: number): number {
  const forward: boolean = !!getRandomNum(0, 1);
  const degRef: number = 40;
  const offset: number = 5;
  const deg: number = getRandomNum(degRef - offset, degRef + offset);

  switch (forward) {
    case true:
      const aboveLimit: boolean = hue + deg > 360;
      return aboveLimit ? hue - 360 + deg : hue + deg;
    case false:
      const belowLimit: boolean = hue - deg < 0;
      return belowLimit ? hue + 360 - deg : hue - deg;
  }
}

export function randomHslRef(): HSL {
  const hueRef = getRandomNum(0, 360);
  const satRef = getRandomNum(70, 90);
  const lumRef = getRandomNum(55, 80);

  return {
    h: hueRef,
    s: satRef,
    l: lumRef,
  };
}

export function randomHslMatch(hslRef: HSL): HSL {
  const hueRef = hslRef.h;
  const satRef = hslRef.s;
  const lumRef = hslRef.l;

  const useDark: boolean = getRandomNum(0, 10) === 10;
  const useLight: boolean = getRandomNum(0, 10) === 10;

  const forward = !!getRandomNum(0, 1);
  const randomHueOffset = getRandomNum(15, 345);
  let randomHue = hueRef;

  switch (forward) {
    case false:
      randomHue =
        randomHue - randomHueOffset < 0
          ? randomHue + 360 - randomHueOffset
          : randomHue - randomHueOffset;
      break;
    case true:
      randomHue =
        randomHue + randomHueOffset > 360
          ? randomHue - 360 + randomHueOffset
          : randomHue + randomHueOffset;
      break;
  }

  // let randomSat = satRef;
  // let randomSatOffset = getRandomNum(0, 20);
  // if (randomSat + randomSatOffset > 100) {
  //   randomSat - randomSatOffset;
  // }

  // let randomLum = lumRef;
  // let randomLumOffset = getRandomNum(-10, 10);
  // if (randomLum + randomLumOffset < 0) {
  //   randomLum += Math.abs(randomLumOffset);
  // } else if (randomLum + randomLumOffset > 100) {
  //   randomLum - randomLumOffset;
  // }

  const hslMatch: HSL = {
    h: useDark || useLight ? hueRef : randomHue,
    s: satRef,
    l: useDark
      ? getRandomNum(3, 20)
      : useLight
      ? getRandomNum(93, 100)
      : lumRef,
  };

  return hslMatch;
}

export function initializePalette(hslRef: HSL): TPalette {
  const hueRef = hslRef.h;
  const satRef = hslRef.s;
  const lumRef = hslRef.l;

  const mainHsl: HSL = {
    h: hueRef,
    s: satRef,
    l: lumRef,
  };

  const harmonyHsl: HSL = {
    h: harmonizeHue(hueRef),
    s: satRef,
    l: lumRef,
  };

  const contrastHsl: HSL = {
    h: contrastHue(hueRef),
    s: satRef,
    l: lumRef,
  };

  const darkHsl: HSL = {
    h: hueRef,
    s: getRandomNum(5, 25),
    l: getRandomNum(5, 20),
  };

  const lightHsl: HSL = {
    h: hueRef,
    s: getRandomNum(98, 100),
    l: getRandomNum(98, 100),
  };

  const hexList = [
    hslToHex(mainHsl),
    hslToHex(harmonyHsl),
    hslToHex(contrastHsl),
    hslToHex(darkHsl),
    hslToHex(lightHsl),
  ];

  const palette: TPalette = hexList.map(hex => {
    return {
      hex,
      rgb: hexToRgb(hex),
      hsl: hexToHsl(hex),
      isLocked: false,
    };
  });

  return shuffleArray(palette);
}

export function calcSatAndLumAvg(colors: TPalette) {
  const saturatedColors = colors.filter(color => color.hsl.s > 30);
  const satAvg: number = Math.round(
    saturatedColors.reduce((prev, curr) => {
      return prev + curr.hsl.s;
    }, 0) / saturatedColors.length
  );

  const visibleLumColors = colors.filter(
    color => color.hsl.l >= 15 && color.hsl.l < 90
  );
  const lumAvg: number = Math.round(
    visibleLumColors.reduce((prev, curr) => {
      return prev + curr.hsl.l;
    }, 0) / visibleLumColors.length
  );

  return { satAvg, lumAvg };
}

function findHueVariant(
  currentHues: number[],
  recursions: number
): void | number {
  // Generate random hue
  const newHue: number = getRandomNum(0, 360);

  // Eliminate risk of infinite recursion
  if (recursions > 500) return newHue;

  const isTooSimilar = (newHue: number, existingHue: number) => {
    const minDiffThreshold: number = 20;
    const difference: number = Math.abs(existingHue - newHue);
    const isInsideSimilarityRange: boolean = difference <= minDiffThreshold;
    return isInsideSimilarityRange;
  };

  // Check for similar hue
  const foundSimilarHue: boolean = currentHues.some(currHue =>
    isTooSimilar(newHue, currHue)
  );

  // Recurr if similar hue, else return newHue
  if (foundSimilarHue) {
    recursions++;
    return findHueVariant(currentHues, recursions);
  } else {
    return newHue;
  }
}

export function getColorMatches(colors: TPalette, hslRef: HSL) {
  type TColorMatch = TColor & { pos: number };

  const lockedColors: TColorMatch[] = [];
  const unlockedColors: TColorMatch[] = [];

  colors.forEach((color, i) => {
    return color.isLocked
      ? lockedColors.push({ ...color, pos: i })
      : unlockedColors.push({ ...color, pos: i });
  });

  const newColorPalette: TColorMatch[] = [];

  unlockedColors.forEach(color => {
    const currentHues = [...lockedColors, ...newColorPalette].length
      ? [...lockedColors, ...newColorPalette].map(color => color.hsl.h)
      : [];

    const hsl: HSL = {
      h: findHueVariant([...currentHues], 0) as number,
      s: hslRef.s,
      l: hslRef.l,
    };
    const hex: HEX = hslToHex(hsl);
    const rgb: RGB = hslToRgb(hsl);

    return newColorPalette.push({ ...color, hex, rgb, hsl });
  });

  const includeDarkColor =
    [...lockedColors, ...newColorPalette].every(color => color.hsl.l > 15) &&
    getRandomNum(0, 5) === 5; // 1 in 5 chance to include a dark color

  if (includeDarkColor) {
    const randomIndex =
      newColorPalette.length === 1
        ? 0
        : getRandomNum(0, newColorPalette.length - 1);

    const darkHslMatch: HSL = {
      h: newColorPalette[randomIndex].hsl.h,
      s: hslRef.s,
      l: getRandomNum(5, 15),
    };

    newColorPalette[randomIndex] = {
      ...newColorPalette[randomIndex],
      hsl: darkHslMatch,
      hex: hslToHex(darkHslMatch),
      rgb: hslToRgb(darkHslMatch),
    };
  }

  const includeLightColor =
    [...lockedColors, ...newColorPalette].every(color => color.hsl.l < 90) &&
    getRandomNum(0, 5) === 5; // 1 in 5 chance to include a light color

  if (!includeDarkColor && includeLightColor) {
    const randomIndex =
      newColorPalette.length === 1
        ? 0
        : getRandomNum(0, newColorPalette.length - 1);

    const lightHslMatch: HSL = {
      h: hslRef.h,
      s: 100,
      l: getRandomNum(95, 100),
    };

    newColorPalette[randomIndex] = {
      ...newColorPalette[randomIndex],
      hsl: lightHslMatch,
      hex: hslToHex(lightHslMatch),
      rgb: hslToRgb(lightHslMatch),
    };
  }

  return [...lockedColors, ...newColorPalette].sort((a, b) => a.pos - b.pos);
}

/**
 * @deprecated This function is faulty and should not be used.
 */
export function getMonochromaticNeighbours(hsl: HSL): HEX[] {
  const { h, s, l } = hsl;
  const interval = 5;

  const satNeighbours = [
    s,
    s - interval * 2 < 0 ? s + interval * 3 : s - interval * 2,
    s - interval < 0 ? s + interval * 4 : s - interval,
    s + interval > 100 ? s - interval * 4 : s + interval,
    s + interval * 2 > 100 ? s - interval * 3 : s + interval * 2,
  ];

  const lumNeighbours = [
    l,
    l - interval * 2 < 0 ? l + interval * 3 : l - interval * 2,
    l - interval < 0 ? l + interval * 4 : l - interval,
    l + interval > 100 ? l - interval * 4 : l + interval,
    l + interval * 2 > 100 ? l - interval * 3 : l + interval * 2,
  ];

  const monochromaticNeighbours = lumNeighbours
    .map((lumVal, i) => ({ h, s: s === 0 ? s : satNeighbours[i], l: lumVal }))
    .sort((a, b) => {
      const rgbOfA = hslToRgb(a);
      const rgbOfB = hslToRgb(b);

      const avgRgbOfA = Math.ceil((rgbOfA.r + rgbOfA.g + rgbOfA.b) / 3);
      const avgRgbOfB = Math.ceil((rgbOfB.r + rgbOfB.g + rgbOfB.b) / 3);

      return avgRgbOfA - avgRgbOfB;

      // b.l + b.s - (a.l + a.s)
    });

  return monochromaticNeighbours.map(mn => hslToHex(mn));
}

export function getShades(hexStr: HEX): HEX[] {
  const { r, g, b } = hexToRgb(hexStr);

  const offset = 10;
  const numOfAdditionalShades = 8;
  const maxOffset = offset * (numOfAdditionalShades / 2);
  const MIN = 0;
  const MAX = 255;

  function parseRgbValue(value: number): number {
    if (value < MIN) return MIN;
    else if (value > MAX) return MAX;
    return value;
  }

  let rgbArr: RGB[] = [];
  // if ([r, g, b].every(val => val - maxOffset <= MIN)) {
  //   // Color is too dark. Generate shades with increasing values

  //   // Push base shade
  //   rgbArr.push({ r, g, b });

  //   // Generate shades and push
  //   for (let i = 1; i <= 8; i++) {
  //     const currentShade: RGB = {
  //       r: parseRgbValue(r + offset * i),
  //       g: parseRgbValue(g + offset * i),
  //       b: parseRgbValue(b + offset * i),
  //     };

  //     rgbArr.push(currentShade);
  //   }
  // } else if ([r, g, b].every(val => val + maxOffset >= MAX)) {
  //   // Color is too bright. Generate shades with decreasing values

  //   // Generate shades and push
  //   for (let i = 1; i <= 8; i++) {
  //     const currentShade: RGB = {
  //       r: parseRgbValue(r - offset * i),
  //       g: parseRgbValue(g - offset * i),
  //       b: parseRgbValue(b - offset * i),
  //     };

  //     rgbArr.push(currentShade);
  //   }

  //   // Push base shade
  //   rgbArr.push({ r, g, b });
  // } else {
  const possibleDecrements = [1, 2, 3, 4, 5, 6, 7].filter(num => {
    return [r, g, b].every(val => val - offset * num > MIN);
  }).length;
  const possibleIncrements = [1, 2, 3, 4, 5, 6, 7].filter(num => {
    return [r, g, b].every(val => val + offset * num < MAX);
  }).length;

  let decrements = 4;
  let increments = 4;

  if (possibleIncrements > possibleDecrements) {
    decrements = possibleDecrements;
    increments = numOfAdditionalShades - decrements;
  } else if (possibleDecrements > possibleIncrements) {
    increments = possibleIncrements;
    decrements = numOfAdditionalShades - increments;
  }

  // Generate shades with decreasing values
  for (let i = 0; i < decrements; i++) {
    const currentShade: RGB = {
      r: parseRgbValue(r - offset * (i + 1)),
      g: parseRgbValue(g - offset * (i + 1)),
      b: parseRgbValue(b - offset * (i + 1)),
    };

    rgbArr.push(currentShade);
  }

  // Push base shade
  rgbArr.push({ r, g, b });

  // Generate shades with increasing values
  for (let i = 0; i < increments; i++) {
    const currentShade: RGB = {
      r: parseRgbValue(r + offset * (i + 1)),
      g: parseRgbValue(g + offset * (i + 1)),
      b: parseRgbValue(b + offset * (i + 1)),
    };

    rgbArr.push(currentShade);
  }
  // }

  // Sort by average RGB, convert to HEX and return
  return rgbArr
    .sort((a, b) => {
      const avgRgbOfA = (a.r + a.g + a.b) / 3;
      const avgRgbOfB = (b.r + b.g + b.b) / 3;

      return avgRgbOfA - avgRgbOfB;
    })
    .map(color => rgbToHex(color));
}

export function isDark(rgb: RGB): boolean {
  const { r, g, b } = rgb;
  return r * 0.299 + g * 0.587 + b * 0.114 < 155;
}

export function calcContrastRatio(rgb1: RGB, rgb2: RGB): number {
  type CalcContrastRatioResponse = {
    ratio: number;
    meetsRequirements: boolean;
  };

  function relativeLuminance(rgb: RGB) {
    const { r, g, b } = rgb;
    const [lumR, lumG, lumB] = [r, g, b].map(val => {
      const proportion = val / 255;

      return proportion <= 0.03928
        ? proportion / 12.92
        : Math.pow((proportion + 0.55) / 1.055, 2.4);
    });

    return 0.2126 * lumR + 0.7152 * lumG + 0.0722 * lumB;
  }

  const lum1 = relativeLuminance(rgb1);
  const lum2 = relativeLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  const ratio = (brightest + 0.05) / (darkest + 0.05);

  return ratio;
}
