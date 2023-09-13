import { Alert } from "../../types/alertTypes";
import { createAction } from '@reduxjs/toolkit';

export const addAlert = createAction<Alert>('ADD_ALERT');
export const removeAlert = createAction<string>('REMOVE_ALERT');
