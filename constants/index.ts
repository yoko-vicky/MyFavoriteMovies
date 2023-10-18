import { ValidateMsgTypeState } from '@/types';
import data from './data.json';

export const msgs = data.messages;
export const errorMsgs = data.messages.error;
export const successMsgs = data.messages.success;
export const imageAlt = data.imageAlt;
export const movieListVariant = data.movieListVariant;
export const defaultOg = data.og;
export const formVal = data.formValidation;

export const REGEX_USER_NAME = /[a-zA-Z0-9\s_]/;
export const USER_NAME_MAX_LENGTH = 50;
export const USER_BIO_MAX_LENGTH = 160;
