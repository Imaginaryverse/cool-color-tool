import { FC, useState, useEffect, CSSProperties } from 'react';

type RgbEditorProps = {
  rgb: RGB;
  onChange: (rgb: RGB) => void;
};

type RgbColor = 'r' | 'g' | 'b';

const RgbEditor: FC<RgbEditorProps> = ({ rgb, onChange }) => {
  const [rgbInput, setRgbInput] = useState<RGB>(rgb);

  const rgbColors: RgbColor[] = ['r', 'g', 'b'];

  function handleInputChange(value: number, color: RgbColor) {
    if (isNaN(value)) return;
    else if (value > 255) value = 255;

    switch (color) {
      case 'r':
        setRgbInput(prevState => ({ ...prevState, r: value }));
        return onChange({ ...rgbInput, r: value });
      case 'g':
        setRgbInput(prevState => ({ ...prevState, g: value }));
        return onChange({ ...rgbInput, g: value });
      case 'b':
        setRgbInput(prevState => ({ ...prevState, b: value }));
        return onChange({ ...rgbInput, b: value });
      default:
        return;
    }
  }

  function handleRgbPlusMinus(value: number, valueName: RgbColor) {
    return value < 0 || value > 255
      ? null
      : handleInputChange(value, valueName);
  }

  useEffect(() => {
    setRgbInput(rgb);
  }, [rgb]);

  const rgbEditorStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  };

  const inputWrapperStyle: CSSProperties = {
    width: '100%',
    margin: '0.12rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const sliderInputStyle: CSSProperties = {
    width: '125px',
    marginLeft: '0.25rem',
  };

  const textInputStyle: CSSProperties = {
    width: '35px',
    marginLeft: '0.25rem',
    textAlign: 'center',
  };

  const plusMinusBtnStyle: CSSProperties = {
    minWidth: '22px',
    marginLeft: '0.25rem',
  };

  return (
    <div className='rgb-editor' style={rgbEditorStyle}>
      {rgbColors.map((colorName, i) => {
        return (
          <div key={i} className='rgb-input-wrapper' style={inputWrapperStyle}>
            <label className='rgb-label' style={{ fontSize: '0.8rem' }}>
              {colorName.toUpperCase()}:
            </label>
            <input
              className='range-input rgb-slider'
              type='range'
              min={0}
              max={255}
              value={rgbInput[colorName]}
              onChange={e => handleInputChange(+e.target.value, colorName)}
              style={sliderInputStyle}
            />
            <input
              className='text-input rgb-input'
              type='text'
              value={rgbInput[colorName]}
              maxLength={3}
              onChange={e => handleInputChange(+e.target.value, colorName)}
              style={textInputStyle}
            />
            <span>
              <button
                type='button'
                onClick={() =>
                  handleRgbPlusMinus(rgbInput[colorName] - 1, colorName)
                }
                style={plusMinusBtnStyle}
              >
                -
              </button>
              <button
                type='button'
                onClick={() =>
                  handleRgbPlusMinus(rgbInput[colorName] + 1, colorName)
                }
                style={plusMinusBtnStyle}
              >
                +
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RgbEditor;
