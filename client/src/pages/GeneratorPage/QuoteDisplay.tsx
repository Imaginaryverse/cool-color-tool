import { FC, useState, useEffect, CSSProperties } from 'react';
import { getColorQuote } from '../../utils/getColorQuote';

const QuoteDisplay: FC = () => {
  const [quote, setQuote] = useState<ColorQuote>(getColorQuote());

  useEffect(() => {
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setQuote(getColorQuote());
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  const quoteDisplayContainerStyle: CSSProperties = {
    height: '150px',
    width: '100%',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  };

  const quoteDisplayStyle: CSSProperties = {
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // border: '1px solid #CCCCCC',
  };

  const quoteTextStyle: CSSProperties = {
    marginBottom: '1rem',
    fontSize: '1em',
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: '#808080',
  };

  const quoteAuthorStyle: CSSProperties = {
    fontSize: '1em',
    fontFamily: 'serif',
    fontStyle: 'bold',
    color: '#808080',
  };

  return (
    <div className='quote-display-container' style={quoteDisplayContainerStyle}>
      <div className='quote-display' style={quoteDisplayStyle}>
        <p className='quote-text' style={quoteTextStyle}>
          {quote.text}
        </p>
        <p className='quote-author' style={quoteAuthorStyle}>
          {quote.author}
        </p>
      </div>
    </div>
  );
};

export default QuoteDisplay;
