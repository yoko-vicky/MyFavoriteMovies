import { Id, toast } from 'react-toastify';
import { errorMsgs, successMsgs } from '@/constants/index';

export const errorToastify = (message: string = errorMsgs.general) =>
  toast(message, {
    type: 'error',
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000,
  });

export const successToastify = (message: string = successMsgs.general) =>
  toast(message, {
    type: 'success',
    hideProgressBar: false,
    closeOnClick: true,
    autoClose: 3000,
  });

export const loadingToastify = () => toast.loading('Updating...');
export const updateToastify = (
  id: Id,
  type: 'success' | 'error',
  msg?: string,
) =>
  toast.update(id, {
    render:
      msg || (type === 'success' ? successMsgs.general : errorMsgs.general),
    type: type,
    isLoading: false,
    closeOnClick: true,
    autoClose: 3000,
  });

export type ToastId = Id;
