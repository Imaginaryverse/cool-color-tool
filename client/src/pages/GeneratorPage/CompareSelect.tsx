import { FC, CSSProperties } from 'react';
import { hexToRgb, isDark } from '../../utils/colorUtils';

type Props = {
  palette: TPalette;
  selectedIndex: number;
  type: CompareSelectType;
  onSelect: (idx: number) => void;
};

type CompareSelectType = 'background' | 'foreground';

const CompareSelect: FC<Props> = ({
  palette,
  selectedIndex,
  type,
  onSelect,
}) => {
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
    padding: '0 9%',
    display: 'flex',
    justifyContent: type === 'background' ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const selectMarkerStyle: CSSProperties = {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
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
          {selectedIndex === i && (
            <span
              style={{
                ...selectMarkerStyle,
                backgroundColor: isDark(hexToRgb(color.hex))
                  ? 'white'
                  : 'black',
              }}
            ></span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CompareSelect;
