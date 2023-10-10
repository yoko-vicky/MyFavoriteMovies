import { toast } from 'react-toastify';
import { errorMsgs, successMsgs } from '@/constants';

export const errorToastify = (message: string = errorMsgs.general) =>
  toast(message, { type: 'error', hideProgressBar: false });

export const successToastify = (message: string = successMsgs.general) =>
  toast(message, { type: 'success', hideProgressBar: false });
