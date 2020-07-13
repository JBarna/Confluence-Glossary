import { DICTIONARY } from "./words";

export function findMatchingWords(text: string): any {
  const matches = {};

  const words = text.match(/\w+(?:'\w+)*/g);

  words.forEach((w) => {
    const word = w.toLowerCase();
    if (DICTIONARY[word]) {
      matches[word] = DICTIONARY[word];
    }
  });

  return matches;
}
