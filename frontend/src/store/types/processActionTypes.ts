import { Process } from "../../types/ProcessTypes";

export enum ProcessActionTypes {
    CREATE_PROCESS = 'CREATE_PROCESS',
    UPDATE_PROCESS = 'UPDATE_PROCESS',
    DELETE_PROCESS = 'DELETE_PROCESS',
    GET_ALL_PROCESSES = 'GET_ALL_PROCESSES',
    SET_PROCESS = 'SET_PROCESS',
    CHANGE_IN_EDIT_MODE = 'CHANGE_IN_EDIT_MODE',
    SET_DOCUMENT_TYPE = 'SET_DOCUMENT_TYPE',
    SET_PROCESS_DIALOG = 'SET_PROCESS_DIALOG',
    SET_LOADING_PROCESSES = 'SET_LOADING_PROCESSES'
}

export interface CreateProcessAction {
    type: typeof ProcessActionTypes.CREATE_PROCESS;
    payload: Process;
}

export interface UpdateProcessAction {
    type: typeof ProcessActionTypes.UPDATE_PROCESS;
    payload: Process;
}

export interface DeleteProcessAction {
    type: typeof ProcessActionTypes.DELETE_PROCESS;
    payload: string;
}

export interface GetAllProcessesAction {
    type: typeof ProcessActionTypes.GET_ALL_PROCESSES;
    payload: Process[];
}

export interface SetProcessAction {
    type: typeof ProcessActionTypes.SET_PROCESS;
    payload: Process;
}

export interface ChangeInEditModeAction {
    type: typeof ProcessActionTypes.CHANGE_IN_EDIT_MODE;
    payload: boolean;
}

export interface SetProcessDialogAction {
    type: typeof ProcessActionTypes.SET_PROCESS_DIALOG;
    payload: boolean;
}

export interface SetLoadingProcessesAction {
    type: typeof ProcessActionTypes.SET_LOADING_PROCESSES;
    payload: boolean;
}

export type ProcessActions = CreateProcessAction | UpdateProcessAction | DeleteProcessAction | GetAllProcessesAction | SetProcessAction | ChangeInEditModeAction | SetProcessDialogAction | SetLoadingProcessesAction;
