import { colorQuotes } from '../data/colorQuotes';
import { getRandomNum } from './numberUtils';

export function getColorQuote() {
  const randomIndex = getRandomNum(0, colorQuotes.length - 1);

  return colorQuotes[randomIndex];
}
