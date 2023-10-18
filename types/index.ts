export interface ObjectState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type LoadingHeight = 'xsm' | 'sm' | 'md' | 'lg';
export type LoadingWidth = 'sm' | 'half' | 'full';
export type SpinnerSize = 'sm' | 'md';
export type UserRateType = 0 | 1 | 2 | 3 | 4 | 5;

export enum ValidateMsgTypeState {
  ERROR,
  OK,
}
export interface ValidateMsgState {
  msg: string;
  type: ValidateMsgTypeState;
}
