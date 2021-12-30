import { CSSProperties, FC, useState, useEffect } from 'react';
import { getColorName } from '../../utils/nameUtils';
import { getColorQuote } from '../../utils/getColorQuote';
import CompareSelect from './CompareSelect';
import { calcContrastRatio } from '../../utils/colorUtils';
import ContrastInfo from './ContrastInfo';

type Props = {
  palette: TPalette;
};

const ContrastCompare: FC<Props> = ({ palette }) => {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(1);
  const [colorQuote, setColorQuote] = useState(getColorQuote);

  const [contrastRatio, setContrastRatio] = useState(0);

  useEffect(() => {
    setColorQuote(getColorQuote());
  }, [leftIndex, rightIndex]);

  useEffect(() => {
    const ratio = calcContrastRatio(
      palette[leftIndex].rgb,
      palette[rightIndex].rgb
    );
    setContrastRatio(ratio);
  }, [palette, leftIndex, rightIndex]);

  const mainWrapperStyle: CSSProperties = {
    width: '100%',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  };

  const labelContainerStyle: CSSProperties = {
    width: '100%',
    padding: '.25rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const labelStyle: CSSProperties = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '9.5px',
    fontWeight: 'bold',
  };

  const contrastCompareContainerStyle: CSSProperties = {
    height: '300px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  };

  return (
    <div style={mainWrapperStyle}>
      <header className='label-container' style={labelContainerStyle}>
        <p
          style={{
            ...labelStyle,
            minWidth: '50px',
            width: '16%',
          }}
        >
          Background
        </p>
        <p style={{ ...labelStyle }}>Preview</p>
        <p
          style={{
            ...labelStyle,
            minWidth: '50px',
            width: '16%',
          }}
        >
          Foreground
        </p>
      </header>
      <div
        className='contrast-compare-container'
        style={contrastCompareContainerStyle}
      >
        <CompareSelect
          palette={palette}
          selectedIndex={leftIndex}
          type='background'
          onSelect={setLeftIndex}
        />

        <ContrastInfo
          palette={palette}
          leftIndex={leftIndex}
          rightIndex={rightIndex}
          ratio={contrastRatio}
        />

        <CompareSelect
          palette={palette}
          selectedIndex={rightIndex}
          type='foreground'
          onSelect={setRightIndex}
        />
      </div>
    </div>
  );
};

export default ContrastCompare;
