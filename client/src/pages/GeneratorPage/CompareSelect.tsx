import { FC, CSSProperties } from 'react';
import { hexToRgb, isDark } from '../../utils/colorUtils';

type Props = {
  palette: TPalette;
  selectedIndex: number;
  onSelect: (idx: number) => void;
};

const CompareSelect: FC<Props> = ({ palette, selectedIndex, onSelect }) => {
  const listStyle: CSSProperties = {
    height: '100%',
    minWidth: '50px',
    width: '16%',
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
  };

  const listItemStyle: CSSProperties = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const selectTextStyle: CSSProperties = {
    fontSize: '0.7rem',
  };

  return (
    <ul className='compare-select-list' style={listStyle}>
      {palette.map((color, i) => (
        <li
          key={i}
          className='compare-select-list-item'
          onClick={() => onSelect(i)}
          style={{ ...listItemStyle, backgroundColor: color.hex }}
        >
          <p
            style={{
              ...selectTextStyle,
              color: isDark(hexToRgb(color.hex)) ? 'white' : 'black',
            }}
          >
            {selectedIndex === i && 'selected'}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default CompareSelect;
