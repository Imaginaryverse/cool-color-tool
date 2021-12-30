import { FC, CSSProperties } from 'react';

type EditorColorPreviewProps = {
  hex: HEX;
};

const ColorCircle: FC<EditorColorPreviewProps> = ({ hex }) => {
  const colorPreviewStyle: CSSProperties = {
    minHeight: '60px',
    minWidth: '60px',
    marginRight: '0.5rem',
    borderRadius: '50%',
    border: '1px solid rgb(235, 235, 235)',
  };

  return <div style={{ ...colorPreviewStyle, backgroundColor: hex }}></div>;
};

export default ColorCircle;
