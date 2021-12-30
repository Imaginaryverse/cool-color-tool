import { CSSProperties, FC } from 'react';
import { EditorMode } from './ColorEditor';

type ModeSelectProps = {
  editorModes: EditorMode[];
  activeMode: EditorMode;
  onSelectMode: (mode: EditorMode) => void;
};

const ModeSelect: FC<ModeSelectProps> = ({
  editorModes,
  activeMode,
  onSelectMode,
}) => {
  const modeContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonStyle: CSSProperties = {
    height: '25px',
    minWidth: '60px',
    margin: '0 0.25rem',
    fontSize: '0.7rem',
  };

  return (
    <header className='mode-container' style={modeContainerStyle}>
      {editorModes.map((mode, i) => {
        return (
          <button
            key={i}
            onClick={() => onSelectMode(mode)}
            disabled={activeMode === mode}
            style={buttonStyle}
          >
            {mode}
          </button>
        );
      })}
    </header>
  );
};

export default ModeSelect;
