import { CSSProperties, FC, useEffect, useState } from 'react';

type HslEditorProps = {
  hsl: HSL;
  onChange: (hsl: HSL) => void;
};

type HslValue = 'h' | 's' | 'l';

const HslEditor: FC<HslEditorProps> = ({ hsl, onChange }) => {
  const [hslInput, setHslInput] = useState<HSL>(hsl);
  const hslValues: HslValue[] = ['h', 's', 'l'];

  function handleInputChange(value: number, valueName: HslValue) {
    if (isNaN(value)) return;

    switch (valueName) {
      case 'h':
        value = value > 360 ? 360 : value;
        setHslInput(prevState => ({
          ...prevState,
          h: value,
        }));
        return onChange({ ...hslInput, h: value });
      case 's':
        value = value > 100 ? 100 : value;
        setHslInput(prevState => ({
          ...prevState,
          s: value,
        }));
        return onChange({ ...hslInput, s: value });
      case 'l':
        value = value > 100 ? 100 : value;
        setHslInput(prevState => ({
          ...prevState,
          l: value,
        }));
        return onChange({ ...hslInput, l: value });
      default:
        return;
    }
  }

  function handleHslPlusMinus(value: number, valueName: HslValue) {
    if (value < 0) return;

    switch (valueName) {
      case 'h':
        return value > 360 ? null : handleInputChange(value, valueName);
      case 's':
      case 'l':
        return value > 100 ? null : handleInputChange(value, valueName);
      default:
        return;
    }
  }

  useEffect(() => {
    setHslInput(hsl);
  }, [hsl]);

  const hslEditorStyle: CSSProperties = {
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
    <div className='hsl-editor' style={hslEditorStyle}>
      {hslValues.map((valueName, i) => {
        return (
          <div key={i} className='hsl-input-wrapper' style={inputWrapperStyle}>
            <label className='hsl-label' style={{ fontSize: '0.8rem' }}>
              {valueName.toUpperCase()}:
            </label>
            <input
              className='range-input hsl-slider'
              type='range'
              min={0}
              max={valueName === 'h' ? 360 : 100}
              value={hslInput[valueName]}
              onChange={e => handleInputChange(+e.target.value, valueName)}
              style={sliderInputStyle}
            />
            <input
              className='text-input hsl-input'
              type='text'
              value={hslInput[valueName]}
              maxLength={3}
              onChange={e => handleInputChange(+e.target.value, valueName)}
              style={textInputStyle}
            />
            <span>
              <button
                type='button'
                onClick={() =>
                  handleHslPlusMinus(hslInput[valueName] - 1, valueName)
                }
                style={plusMinusBtnStyle}
              >
                -
              </button>
              <button
                type='button'
                onClick={() =>
                  handleHslPlusMinus(hslInput[valueName] + 1, valueName)
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

export default HslEditor;
