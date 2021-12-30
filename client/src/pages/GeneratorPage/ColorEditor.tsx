import { FC, useState, useEffect, CSSProperties } from 'react';
import { getColorName } from '../../utils/nameUtils';

import ColorCircle from './ColorCircle';
import HexEditor from './HexEditor';
import HslEditor from './HslEditor';
import ModeSelect from './ModeSelect';
import RgbEditor from './RgbEditor';

type ColorEditorProps = {
  selectedIndex: number;
  colorPalette: TPalette;
  adjustColor: (
    index: number,
    format: TColorFormat,
    hex?: HEX,
    rgb?: RGB,
    hsl?: HSL
  ) => void;
};

export type EditorMode = 'Hex' | 'RGB' | 'HSL';

const editorModes: EditorMode[] = ['Hex', 'RGB', 'HSL'];

const ColorEditor: FC<ColorEditorProps> = ({
  selectedIndex,
  colorPalette,
  adjustColor,
}) => {
  const [activeMode, setActiveMode] = useState<EditorMode>(editorModes[0]);
  const [selectedColor, setSelectedColor] = useState<TColor>(
    colorPalette[selectedIndex]
  );

  function handleHexChange(newHex: HEX) {
    return adjustColor(selectedIndex, 'hex', newHex);
  }

  function handleRgbChange(newRgb: RGB) {
    return adjustColor(selectedIndex, 'rgb', undefined, newRgb);
  }

  function handleHslChange(newHsl: HSL) {
    return adjustColor(selectedIndex, 'hsl', undefined, undefined, newHsl);
  }

  useEffect(() => {
    setSelectedColor(colorPalette[selectedIndex]);
  }, [selectedIndex, colorPalette]);

  const colorEditorStyle: CSSProperties = {
    minWidth: '320px',
    width: '100%',
    maxWidth: '400px',
    margin: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const editorWrapperStyle: CSSProperties = {
    minHeight: '85px',
    height: '100%',
    minWidth: '240px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className='color-editor' style={colorEditorStyle}>
      <ModeSelect
        editorModes={editorModes}
        activeMode={activeMode}
        onSelectMode={setActiveMode}
      />

      <div className='editor-wrapper' style={editorWrapperStyle}>
        <ColorCircle hex={selectedColor.hex} />

        {selectedColor !== undefined && activeMode === 'Hex' && (
          <HexEditor hex={selectedColor.hex} onChange={handleHexChange} />
        )}

        {selectedColor !== undefined && activeMode === 'RGB' && (
          <RgbEditor rgb={selectedColor.rgb} onChange={handleRgbChange} />
        )}

        {selectedColor !== undefined && activeMode === 'HSL' && (
          <HslEditor hsl={selectedColor.hsl} onChange={handleHslChange} />
        )}
      </div>
    </div>
  );
};

export default ColorEditor;
