export const notWebp = (src: string): string => src.replace('fm=webp', '');

export const escapeQuotes = (str: string = ''): string =>
  str.replace(/\"/gm, '&quot;');
