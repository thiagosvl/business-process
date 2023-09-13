import { AnyAction } from "@reduxjs/toolkit";
import { Alert } from "../../types/alertTypes";
import { AlertActionTypes } from "../types/alertActionTypes";

const initialState: Alert[] = [];

const alertReducer = (state = initialState, action: AnyAction): Alert[] => {
    switch (action.type) {
        case AlertActionTypes.ADD_ALERT:
            return [...state, action.payload];
        case AlertActionTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
};

export default alertReducer;
