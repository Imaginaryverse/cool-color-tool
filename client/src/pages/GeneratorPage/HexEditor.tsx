import { FC, useState, useEffect, CSSProperties } from 'react';

type HexEditorProps = {
  hex: HEX;
  onChange: (hex: HEX) => void;
};

const invalidSymbol = new RegExp(/[^\dABCDEF]/i);
const validFormat = new RegExp(/^#[\dABCDEF]{6}$/i);

const HexEditor: FC<HexEditorProps> = ({ hex, onChange }) => {
  const [hexInput, setHexInput] = useState<string>(hex);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  function isInvalidHex(hexStr: HEX) {
    return (
      invalidSymbol.test(hexStr[hexStr.length - 1]) || !validFormat.test(hexStr)
    );
  }

  function handleChange(value: string) {
    value = value.toUpperCase();

    if (value[0] !== '#') {
      value = '#' + value;
    }

    if (value.length > 1 && invalidSymbol.test(value[value.length - 1])) return;

    setHexInput(value);
    return isInvalidHex(value) ? null : onChange(value);
  }

  function handleOnBlur() {
    if (isInvalid) {
      setHexInput(hex);
      setIsInvalid(false);
    }
    return;
  }

  useEffect(() => {
    return setHexInput(hex);
  }, [hex]);

  useEffect(() => {
    return setIsInvalid(isInvalidHex(hexInput));
  }, [hexInput]);

  return (
    <div
      className='hex-editor'
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <input
        type='text'
        value={hexInput}
        onChange={e => handleChange(e.target.value)}
        onBlur={() => handleOnBlur()}
        maxLength={7}
        className='text-input hex-input'
        style={{ paddingLeft: '2px', color: isInvalid ? 'red' : 'black' }}
      />
    </div>
  );
};

export default HexEditor;
