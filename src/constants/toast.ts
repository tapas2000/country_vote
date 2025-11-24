// Toast action type constants

export const TOAST_ACTIONS = {
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  SHOW_ERROR: 'SHOW_ERROR',
  HIDE: 'HIDE',
} as const;

export type ToastType = 'success' | 'error';

export const INITIAL_TOAST_STATE = {
  message: '',
  type: 'success' as ToastType,
  isVisible: false,
};
