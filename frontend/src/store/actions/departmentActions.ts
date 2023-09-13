import { DepartmentActionTypes } from "../types/departmentActionTypes"
import { addAlert } from './alertActions';
import { Department } from '../../types/departmentTypes';
import { getAllDepartments, getDepartmentById, deleteDepartment, createDepartment, updateDepartment } from '../../services/departmentService';
import { generateAlertUniqueId } from "../../utils/alertUtils"
import { batch } from "react-redux";

export const setDepartmentAction = (department: Department) => ({
    type: DepartmentActionTypes.SET_DEPARTMENT,
    payload: department
});

export const changeInEditModeAction = (payload: boolean) => ({
    type: DepartmentActionTypes.CHANGE_IN_EDIT_MODE,
    payload
});

export const createDepartmentAction = (department: Department) => async (dispatch: any) => {
    try {
        const response = await createDepartment(department);
        dispatch({
            type: DepartmentActionTypes.CREATE_DEPARTMENT,
            payload: response
        });
        dispatch({
            type: DepartmentActionTypes.SET_DEPARTMENT,
            payload: response
        });
        dispatch({
            type: DepartmentActionTypes.SET_DEPARTMENT_DIALOG,
            payload: false
        });
        dispatch(addAlert({
            type: 'success',
            message: 'Criado com sucesso',
            id: generateAlertUniqueId()
        }));
    } catch (errors) {
        errors.response.data.errors.forEach(error => {
            dispatch(addAlert({
                type: 'error',
                message: error.msg,
                id: generateAlertUniqueId()
            }));
        });
        console.error("Error: ", errors);
    }
};

export const updateDepartmentAction = (department: Department) => async (dispatch: any) => {
    try {
        const response = await updateDepartment(department);
        batch(() => {
            dispatch({
                type: DepartmentActionTypes.UPDATE_DEPARTMENT,
                payload: response
            });
            dispatch({
                type: DepartmentActionTypes.SET_DEPARTMENT,
                payload: response
            });
            dispatch({
                type: DepartmentActionTypes.SET_DEPARTMENT_DIALOG,
                payload: false
            });
            dispatch(addAlert({
                type: 'success',
                message: 'Atualizado com sucesso',
                id: generateAlertUniqueId()
            }));
        })
    } catch (errors) {
        errors.response.data.errors.forEach(error => {
            dispatch(addAlert({
                type: 'error',
                message: error.msg,
                id: generateAlertUniqueId()
            }));
        });
        console.error("Error: ", errors);
    }
};

export const getDepartmentByIdAction = (id: string, includeProcesses: boolean = true) => async (dispatch: any) => {

    try {
        const response = await getDepartmentById(id, includeProcesses);
        batch(() => {
            dispatch({
                type: DepartmentActionTypes.SET_DEPARTMENT,
                payload: response
            });
        })
    } catch (errors) {
        dispatch(addAlert({
            type: 'error',
            message: 'Erro ao consultar departamento.',
            id: generateAlertUniqueId()
        }));
        console.error("Error: ", errors);
    }
}

export const getAllDepartmentsAction = () => async (dispatch: any) => {
    dispatch({
        type: DepartmentActionTypes.SET_LOADING_DEPARTMENTS,
        payload: true
    });
    try {
        const response = await getAllDepartments();
        dispatch({
            type: DepartmentActionTypes.GET_ALL_DEPARTMENTS,
            payload: response
        });
    } catch (error) {
        dispatch(addAlert({
            type: 'error',
            message: "Erro ao carregar departamentos",
            id: generateAlertUniqueId()
        }));
    } finally {
        dispatch({
            type: DepartmentActionTypes.SET_LOADING_DEPARTMENTS,
            payload: false
        });
    }
};

export const deleteDepartmentAction = (departmentId: string) => async (dispatch: any) => {
    try {
        await deleteDepartment(departmentId);
        dispatch({
            type: DepartmentActionTypes.DELETE_DEPARTMENT,
            payload: departmentId
        }); dispatch(addAlert({
            type: 'success',
            message: 'Removido com sucesso',
            id: generateAlertUniqueId()
        }));
    } catch (errors) {
        errors.response.data.errors.forEach(error => {
            dispatch(addAlert({
                type: 'error',
                message: error.msg,
                id: generateAlertUniqueId()
            }));
        });
        console.error("Error: ", errors);
    }
}

export const setDepartmentDialogAction = (open: boolean) => ({
    type: DepartmentActionTypes.SET_DEPARTMENT_DIALOG,
    payload: open
});