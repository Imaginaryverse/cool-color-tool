import { CSSProperties, FC, useState } from 'react';
import { getShades, hexToRgb, isDark } from '../../utils/colorUtils';

type Props = {
  index: number;
  hex: HEX;
  onSetShade: (index: number, format: TColorFormat, hex: HEX) => void;
  onClose: Function;
};

const MonochromaticPicker: FC<Props> = ({
  index,
  hex,
  onSetShade,
  onClose,
}) => {
  const [selectedShade, setSelectedShade] = useState('');

  function handleConfirm(value: HEX) {
    onSetShade(index, 'hex', value);
    onClose();
  }

  const shadesContainerStyle: CSSProperties = {
    position: 'relative',
    height: '100px',
    display: 'flex',
  };

  const closeBtnStyle: CSSProperties = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    height: '22px',
    minWidth: '25px',
    fontSize: '0.7rem',
  };

  const shadeStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.1s ease-in',
  };

  const currentStyle: CSSProperties = {
    fontSize: '0.5rem',
    fontWeight: 'bold',
    transition: 'all 0.1s ease-in',
  };

  const setBtnStyle: CSSProperties = {
    height: '17px',
    padding: '0 5px',
    fontSize: '0.5rem',
  };

  return (
    <div style={shadesContainerStyle}>
      <button type='button' onClick={() => onClose()} style={closeBtnStyle}>
        ×
      </button>
      {getShades(hex).map((hexVal, i) => (
        <div key={i} style={{ ...shadeStyle, backgroundColor: hexVal }}>
          {hex === hexVal ? (
            <p
              style={{
                ...currentStyle,
                color: isDark(hexToRgb(hexVal)) ? 'white' : 'black',
              }}
            >
              Now
            </p>
          ) : (
            <button
              type='button'
              onClick={() =>
                selectedShade !== hexVal
                  ? setSelectedShade(hexVal)
                  : handleConfirm(hexVal)
              }
              style={setBtnStyle}
            >
              {selectedShade !== hexVal ? 'Set' : 'Confirm'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MonochromaticPicker;
