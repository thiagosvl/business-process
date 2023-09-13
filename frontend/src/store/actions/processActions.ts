import { ProcessActionTypes } from "../types/processActionTypes"
import { addAlert } from './alertActions';
import { Process } from '../../types/processTypes';
import { getAllProcesses, getProcessById, deleteProcess, createProcess, updateProcess } from '../../services/processService';
import { generateAlertUniqueId } from "../../utils/alertUtils"
import { batch } from "react-redux";

export const setProcessAction = (department: Process) => ({
    type: ProcessActionTypes.SET_PROCESS,
    payload: department
});

export const changeInEditModeAction = (payload: boolean) => ({
    type: ProcessActionTypes.CHANGE_IN_EDIT_MODE,
    payload
});

export const createProcessAction = (department: Process) => async (dispatch: any) => {
    try {
        const response = await createProcess(department);
        dispatch({
            type: ProcessActionTypes.CREATE_PROCESS,
            payload: response
        });
        dispatch({
            type: ProcessActionTypes.SET_PROCESS,
            payload: response
        });
        dispatch({
            type: ProcessActionTypes.SET_PROCESS_DIALOG,
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

export const updateProcessAction = (department: Process) => async (dispatch: any) => {
    try {
        const response = await updateProcess(department);
        batch(() => {
            dispatch({
                type: ProcessActionTypes.UPDATE_PROCESS,
                payload: response
            });
            dispatch({
                type: ProcessActionTypes.SET_PROCESS,
                payload: response
            });
            dispatch({
                type: ProcessActionTypes.SET_PROCESS_DIALOG,
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

export const getProcessByIdAction = (id: string, includeProcesses: boolean = true) => async (dispatch: any) => {

    try {
        const response = await getProcessById(id, includeProcesses);
        batch(() => {
            dispatch({
                type: ProcessActionTypes.SET_PROCESS,
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

export const getAllProcessesAction = () => async (dispatch: any) => {
    dispatch({
        type: ProcessActionTypes.SET_LOADING_PROCESSES,
        payload: true
    });
    try {
        const response = await getAllProcesses();
        dispatch({
            type: ProcessActionTypes.GET_ALL_PROCESSES,
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
            type: ProcessActionTypes.SET_LOADING_PROCESSES,
            payload: false
        });
    }
};

export const deleteProcessAction = (departmentId: string) => async (dispatch: any) => {
    try {
        await deleteProcess(departmentId);
        dispatch({
            type: ProcessActionTypes.DELETE_PROCESS,
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

export const setProcessDialogAction = (open: boolean) => ({
    type: ProcessActionTypes.SET_PROCESS_DIALOG,
    payload: open
});