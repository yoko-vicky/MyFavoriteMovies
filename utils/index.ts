/* eslint-disable @typescript-eslint/no-explicit-any */
export const getRandomNum = (max = 10) => Math.floor(Math.random() * max);
export const shapeData = (data: any) => JSON.parse(JSON.stringify(data));
export const getReleaseYear = (date: string) => !!date && date.split('-')[0];
export const excerptText = (text: string, maxLength = 40) => {
  const tail = '...';
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + tail;
  }
  return text;
};

export const excerptReview = (text: string, maxLength: number) => {
  return `"${excerptText(text, maxLength)}"`;
};

const distinct = (value: any, index: number, self: any) =>
  self.indexOf(value) === index;

export const getUniqueArr = (arr: any[]) => arr.filter(distinct);
export const getTimestamp = () => Math.floor(Date.now() / 1000);
export const removeExtraSpaceFromStr = (str: string) =>
  str.trim().replaceAll(/\s{2,}/g, ' ');
