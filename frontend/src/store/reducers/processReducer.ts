import { Process } from '@/types/processTypes';
import { ProcessActionTypes } from "../types/processActionTypes"
import { initialForm } from "../../utils/processUtils"
import { ProcessActions } from '../types/processActionTypes';

type ProcessState = {
    processes: Process[];
    process: Process;
    inEditMode: boolean;
    departmentDialog: boolean;
    loadingProcesses: boolean;
};

const initialState: ProcessState = {
    processes: [],
    process: initialForm,
    inEditMode: false,
    departmentDialog: false,
    loadingProcesses: false
};

const departmentReducer = (state = initialState, action: ProcessActions): ProcessState => {
    switch (action.type) {
        case ProcessActionTypes.CREATE_PROCESS:
            return {
                ...state,
                processes: [...state.processes, action.payload]
            };
        case ProcessActionTypes.UPDATE_PROCESS:
            return {
                ...state,
                processes: state.processes.map(process =>
                    process.id === action.payload.id ? action.payload : process
                )
            };
        case ProcessActionTypes.DELETE_PROCESS:
            return {
                ...state,
                processes: state.processes.filter(process => process.id !== action.payload)
            };
        case ProcessActionTypes.GET_ALL_PROCESSES:
            return {
                ...state,
                processes: action.payload
            };
        case ProcessActionTypes.SET_PROCESS:
            return {
                ...state,
                process: action.payload
            };
        case ProcessActionTypes.CHANGE_IN_EDIT_MODE:
            return {
                ...state,
                inEditMode: action.payload
            };
        case ProcessActionTypes.SET_PROCESS_DIALOG:
            return {
                ...state,
                departmentDialog: action.payload
            };
        case ProcessActionTypes.SET_LOADING_PROCESSES:
            return {
                ...state,
                loadingProcesses: action.payload
            };
        default:
            return state;
    }
};

export default departmentReducer;
