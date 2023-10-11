/* eslint-disable @typescript-eslint/no-explicit-any */
export const getRandomNum = (max = 10) => Math.floor(Math.random() * max);
export const shapeData = (data: any) => JSON.parse(JSON.stringify(data));
export const getReleaseYear = (date: string) => date.split('-')[0]
