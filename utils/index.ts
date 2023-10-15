/* eslint-disable @typescript-eslint/no-explicit-any */
export const getRandomNum = (max = 10) => Math.floor(Math.random() * max);
export const shapeData = (data: any) => JSON.parse(JSON.stringify(data));
export const getReleaseYear = (date: string) => date.split('-')[0];
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