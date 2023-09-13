import { Department } from "../../types/departmentTypes";

export enum DepartmentActionTypes {
    CREATE_DEPARTMENT = 'CREATE_DEPARTMENT',
    UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT',
    DELETE_DEPARTMENT = 'DELETE_DEPARTMENT',
    GET_ALL_DEPARTMENTS = 'GET_ALL_DEPARTMENTS',
    SET_DEPARTMENT = 'SET_DEPARTMENT',
    CHANGE_IN_EDIT_MODE = 'CHANGE_IN_EDIT_MODE',
    SET_DOCUMENT_TYPE = 'SET_DOCUMENT_TYPE',
    SET_DEPARTMENT_DIALOG = 'SET_DEPARTMENT_DIALOG',
    SET_LOADING_DEPARTMENTS = 'SET_LOADING_DEPARTMENTS'
}

export interface CreateDepartmentAction {
    type: typeof DepartmentActionTypes.CREATE_DEPARTMENT;
    payload: Department;
}

export interface UpdateDepartmentAction {
    type: typeof DepartmentActionTypes.UPDATE_DEPARTMENT;
    payload: Department;
}

export interface DeleteDepartmentAction {
    type: typeof DepartmentActionTypes.DELETE_DEPARTMENT;
    payload: string;
}

export interface GetAllDepartmentsAction {
    type: typeof DepartmentActionTypes.GET_ALL_DEPARTMENTS;
    payload: Department[];
}

export interface SetDepartmentAction {
    type: typeof DepartmentActionTypes.SET_DEPARTMENT;
    payload: Department;
}

export interface ChangeInEditModeAction {
    type: typeof DepartmentActionTypes.CHANGE_IN_EDIT_MODE;
    payload: boolean;
}

export interface SetDepartmentDialogAction {
    type: typeof DepartmentActionTypes.SET_DEPARTMENT_DIALOG;
    payload: boolean;
}

export interface SetLoadingDepartmentsAction {
    type: typeof DepartmentActionTypes.SET_LOADING_DEPARTMENTS;
    payload: boolean;
}

export type DepartmentActions = CreateDepartmentAction | UpdateDepartmentAction | DeleteDepartmentAction | GetAllDepartmentsAction | SetDepartmentAction | ChangeInEditModeAction | SetDepartmentDialogAction | SetLoadingDepartmentsAction;
