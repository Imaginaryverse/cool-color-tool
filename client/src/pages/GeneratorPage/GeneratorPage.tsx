import { FC, useState, useEffect, CSSProperties } from 'react';
import {
  hslToHex,
  initializePalette,
  randomHslRef,
  hexToRgb,
  hexToHsl,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  calcSatAndLumAvg,
  getColorMatches,
} from '../../utils/colorUtils';
import { getColorName } from '../../utils/nameUtils';
import ColorBar from './ColorBar';
import ColorEditor from './ColorEditor';
import ContrastCompare from './ContrastCompare';

const GeneratorPage: FC = () => {
  const [hslRef, setHslRef] = useState<HSL>(randomHslRef());
  const [colorPalette, setColorPalette] = useState<TPalette>(
    initializePalette(hslRef)
  );
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  function handleRandomClick() {
    const isAllUnlocked = colorPalette.every(color => !color.isLocked);

    if (isAllUnlocked) {
      const newHslRef = randomHslRef();
      const newColorPalette = initializePalette(newHslRef);

      setHslRef(newHslRef);
      return setColorPalette(newColorPalette);
    }

    const paletteWithMatches = getColorMatches(colorPalette, hslRef);
    return setColorPalette(paletteWithMatches);
  }

  function handleSelect(index: number) {
    return index === selectedIndex
      ? setSelectedIndex(undefined)
      : setSelectedIndex(index);
  }

  function toggleLock(index: number) {
    return setColorPalette(prevState => {
      return prevState.map((color, i) => {
        if (i === index) {
          return { ...color, isLocked: !color.isLocked };
        } else {
          return color;
        }
      });
    });
  }

  function adjustColor(
    index: number,
    format: TColorFormat,
    hex?: HEX,
    rgb?: RGB,
    hsl?: HSL
  ) {
    return setColorPalette(prevState => {
      return prevState.map((color, i) => {
        if (i === index) {
          switch (format) {
            case 'hex':
              return hex
                ? {
                    ...color,
                    hex: hex,
                    rgb: hexToRgb(hex),
                    hsl: hexToHsl(hex),
                  }
                : color;
            case 'rgb':
              return rgb
                ? {
                    ...color,
                    hex: rgbToHex(rgb),
                    rgb,
                    hsl: rgbToHsl(rgb),
                  }
                : color;
            case 'hsl':
              return hsl
                ? {
                    ...color,
                    hex: hslToHex(hsl),
                    rgb: hslToRgb(hsl),
                    hsl,
                  }
                : color;
            default:
              return color;
          }
        } else {
          return color;
        }
      });
    });
  }

  useEffect(() => {
    const { satAvg, lumAvg } = calcSatAndLumAvg(colorPalette);

    if (hslRef.s !== satAvg) {
      return setHslRef(prevState => ({ ...prevState, s: satAvg }));
    }

    if (hslRef.l !== lumAvg) {
      return setHslRef(prevState => ({ ...prevState, l: lumAvg }));
    }
  }, [colorPalette]);

  const buttonStyle: CSSProperties = {
    height: '25px',
    minWidth: '60px',
    fontSize: '0.7rem',
  };

  return (
    <div className='page generator-page'>
      {/* <p>Generator Page</p> */}

      <div
        className='color-bar-container'
        style={{
          borderTop: '1px solid black',
          borderBottom: '1px solid black',
          width: '100%',
        }}
      >
        {colorPalette.map((color, i) => {
          return (
            <ColorBar
              key={i}
              index={i}
              // color={color}
              hex={color.hex}
              isLocked={color.isLocked}
              isSelected={selectedIndex === i}
              handleSelect={handleSelect}
              handleSetShade={adjustColor}
              handleToggleLock={toggleLock}
            />
          );
        })}
      </div>

      {selectedIndex !== undefined && (
        <ColorEditor
          selectedIndex={selectedIndex}
          colorPalette={colorPalette}
          adjustColor={adjustColor}
        />
      )}

      <button
        onClick={() => handleRandomClick()}
        disabled={colorPalette.every(color => color.isLocked)}
        style={buttonStyle}
      >
        Random
      </button>

      <ContrastCompare palette={colorPalette} />
    </div>
  );
};

export default GeneratorPage;
