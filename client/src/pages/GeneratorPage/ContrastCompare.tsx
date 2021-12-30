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

  const contrastCompareContainerStyle: CSSProperties = {
    height: '300px',
    width: '100%',
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  };

  return (
    <div
      className='contrast-compare-container'
      style={contrastCompareContainerStyle}
    >
      <CompareSelect
        palette={palette}
        selectedIndex={leftIndex}
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
        onSelect={setRightIndex}
      />
    </div>
  );
};

export default ContrastCompare;
