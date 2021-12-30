import { FC, useState, useEffect, CSSProperties } from 'react';
import { formatContrastRatio } from '../../utils/stringUtils';

type Props = {
  palette: TPalette;
  leftIndex: number;
  rightIndex: number;
  ratio: number;
};

type ContrastRating = 'BAD' | 'OK' | 'GOOD';

function getContrastRating(ratio: number): ContrastRating {
  if (ratio < 3) return 'BAD';
  else if (ratio >= 3 && ratio < 4.5) return 'OK';
  else return 'GOOD';
}

const ContrastInfo: FC<Props> = ({ palette, leftIndex, rightIndex, ratio }) => {
  const contrastInfoContainerStyle: CSSProperties = {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
  };

  const previewBgStyle: CSSProperties = {
    height: '40%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: palette[leftIndex].hex,
    borderBottom: '1px solid black',
  };

  const previewQuoteStyle: CSSProperties = {
    fontStyle: 'italic',
    fontSize: '0.8rem',
    color: palette[rightIndex].hex,
    transition: 'all 0.2s ease',
  };

  const previewAuthorStyle: CSSProperties = {
    marginTop: '1rem',
    fontSize: '0.8rem',
    fontWeight: 'bolder',
    color: palette[rightIndex].hex,
    transition: 'all 0.2s ease',
  };

  const previewTextStyle: CSSProperties = {
    color: palette[rightIndex].hex,
  };

  const testResultsContainer: CSSProperties = {
    height: '60%',
  };

  return (
    <div style={contrastInfoContainerStyle}>
      <div className='preview-bg' style={previewBgStyle}>
        <p style={{ ...previewTextStyle, fontSize: '24px' }}>
          Large normal text
        </p>
        <p
          style={{
            ...previewTextStyle,
            fontSize: '18.75px',
            fontWeight: 'bold',
          }}
        >
          Large bold text
        </p>
        <p
          style={{
            ...previewTextStyle,
            fontSize: '12px',
          }}
        >
          Small normal text
        </p>
      </div>
      <div className='contrast-info-container' style={testResultsContainer}>
        <p>
          Contrast Ratio: {formatContrastRatio(ratio)} (
          {getContrastRating(ratio)})
        </p>
        <p>AA large text: {ratio >= 3 ? 'PASS' : 'FAIL'}</p>
        <p>AA small text: {ratio >= 4.5 ? 'PASS' : 'FAIL'}</p>
        <p>AAA large text: {ratio >= 4.5 ? 'PASS' : 'FAIL'}</p>
        <p>AAA small text: {ratio >= 4.7 ? 'PASS' : 'FAIL'}</p>
      </div>
    </div>
  );
};

export default ContrastInfo;
