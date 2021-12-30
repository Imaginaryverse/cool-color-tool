import { FC, useState, CSSProperties, useEffect } from 'react';
import { hexToRgb, isDark } from '../../utils/colorUtils';
import { getColorName } from '../../utils/nameUtils';
import MonochromaticPicker from './MonochromaticPicker';

type ColorBarProps = {
  index: number;
  hex: HEX;
  isLocked: boolean;
  isSelected: boolean;
  handleSelect: (index: number) => void;
  handleSetShade: (index: number, format: TColorFormat, hex: HEX) => void;
  handleToggleLock: (index: number) => void;
};

const ColorBar: FC<ColorBarProps> = ({
  index,
  hex,
  isLocked,
  isSelected,
  handleSelect,
  handleSetShade,
  handleToggleLock,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showShades, setShowShades] = useState<boolean>(false);
  const [colorName, setColorName] = useState('');

  async function copyToClipboard(text: string): Promise<any> {
    return 'clipboard' in navigator
      ? await navigator.clipboard.writeText(text)
      : document.execCommand('copy', true, text);
  }

  function handleCopyClick() {
    copyToClipboard(hex)
      .then(() => {
        console.log(`📋 ${hex}`);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    setColorName(getColorName(hex));
  }, [hex]);

  const colorBarStyle: CSSProperties = {
    height: '100px',
    width: '100%',
    padding: '0 2.5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const buttonStyle: CSSProperties = {
    height: '25px',
    minWidth: '60px',
    fontSize: '0.7rem',
  };

  const adjustSelectBtnWrapper: CSSProperties = {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  };

  const hexAndNameContainerStyle: CSSProperties = {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const hexValueStyle: CSSProperties = {
    height: '25px',
    fontWeight: 'bold',
    color: isDark(hexToRgb(hex)) ? 'white' : 'rgb(50, 50, 50)',
  };

  const colorNameStyle: CSSProperties = {
    fontSize: '0.7rem',
    color: isDark(hexToRgb(hex)) ? 'white' : 'rgb(50, 50, 50)',
  };

  const copyLockBtnWrapper: CSSProperties = {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  };

  if (showShades) {
    return (
      <MonochromaticPicker
        index={index}
        hex={hex}
        onSetShade={handleSetShade}
        onClose={setShowShades}
      />
    );
  }

  return (
    <div
      className='colorbar'
      style={{ ...colorBarStyle, backgroundColor: hex }}
    >
      <div style={adjustSelectBtnWrapper}>
        <button
          type='button'
          onClick={() => handleSelect(index)}
          style={buttonStyle}
        >
          {isSelected ? 'Unselect' : 'Adjust'}
        </button>
        <button
          type='button'
          onClick={() => setShowShades(true)}
          style={buttonStyle}
        >
          Shades
        </button>
      </div>

      <div style={hexAndNameContainerStyle}>
        <p style={hexValueStyle}>{hex}</p>
        <p style={colorNameStyle}>{colorName}</p>
      </div>

      <div style={copyLockBtnWrapper}>
        <button
          type='button'
          onClick={() => handleCopyClick()}
          disabled={isCopied}
          style={buttonStyle}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>

        <button
          type='button'
          onClick={() => handleToggleLock(index)}
          style={buttonStyle}
        >
          {isLocked ? 'Unlock' : 'Lock'}
        </button>
      </div>
    </div>
  );
};

export default ColorBar;
