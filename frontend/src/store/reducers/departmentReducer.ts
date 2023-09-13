import { Department } from '@/types/departmentTypes';
import { DepartmentActionTypes } from "../types/departmentActionTypes"
import { initialDepartmentForm } from "../../utils/departmentUtils"
import { DepartmentActions } from '../types/departmentActionTypes';

type DepartmentState = {
    departments: Department[];
    department: Department;
    inEditMode: boolean;
    departmentDialog: boolean;
    loadingDepartments: boolean;
};

const initialState: DepartmentState = {
    departments: [],
    department: initialDepartmentForm,
    inEditMode: false,
    departmentDialog: false,
    loadingDepartments: false
};

const departmentReducer = (state = initialState, action: DepartmentActions): DepartmentState => {
    switch (action.type) {
        case DepartmentActionTypes.CREATE_DEPARTMENT:
            return {
                ...state,
                departments: [...state.departments, action.payload]
            };
        case DepartmentActionTypes.UPDATE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.map(department =>
                    department.id === action.payload.id ? action.payload : department
                )
            };
        case DepartmentActionTypes.DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.departments.filter(department => department.id !== action.payload)
            };
        case DepartmentActionTypes.GET_ALL_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            };
        case DepartmentActionTypes.SET_DEPARTMENT:
            return {
                ...state,
                department: action.payload
            };
        case DepartmentActionTypes.CHANGE_IN_EDIT_MODE:
            return {
                ...state,
                inEditMode: action.payload
            };
        case DepartmentActionTypes.SET_DEPARTMENT_DIALOG:
            return {
                ...state,
                departmentDialog: action.payload
            };
        case DepartmentActionTypes.SET_LOADING_DEPARTMENTS:
            return {
                ...state,
                loadingDepartments: action.payload
            };
        default:
            return state;
    }
};

export default departmentReducer;
