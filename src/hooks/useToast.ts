// Custom hook for managing toast notifications with useReducer

import { useReducer } from 'react';
import { TOAST_ACTIONS, ToastType, INITIAL_TOAST_STATE } from '../constants/toast';

export interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
}

type ToastAction =
  | { type: typeof TOAST_ACTIONS.SHOW_SUCCESS; payload: string }
  | { type: typeof TOAST_ACTIONS.SHOW_ERROR; payload: string }
  | { type: typeof TOAST_ACTIONS.HIDE };

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case TOAST_ACTIONS.SHOW_SUCCESS:
      return {
        message: action.payload,
        type: 'success',
        isVisible: true,
      };
    case TOAST_ACTIONS.SHOW_ERROR:
      return {
        message: action.payload,
        type: 'error',
        isVisible: true,
      };
    case TOAST_ACTIONS.HIDE:
      return {
        ...state,
        isVisible: false,
      };
    default:
      return state;
  }
};

export interface UseToastReturn {
  toast: ToastState;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  hideToast: () => void;
}

export const useToast = (): UseToastReturn => {
  const [state, dispatch] = useReducer(toastReducer, INITIAL_TOAST_STATE);

  const showSuccess = (message: string) => {
    dispatch({ type: TOAST_ACTIONS.SHOW_SUCCESS, payload: message });
  };

  const showError = (message: string) => {
    dispatch({ type: TOAST_ACTIONS.SHOW_ERROR, payload: message });
  };

  const hideToast = () => {
    dispatch({ type: TOAST_ACTIONS.HIDE });
  };

  return {
    toast: state,
    showSuccess,
    showError,
    hideToast,
  };
};
