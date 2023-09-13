import axios from 'axios';
import { Department } from '../types/departmentTypes';

const BASE_URL = 'http://localhost:3001/departments';

const getAllDepartments = async (): Promise<Department[]> => {
    try {
        const response = await axios.get<Department[]>(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching departments:", error);
        throw error;
    }
};

const getDepartmentById = async (id: string, includeProcesses: boolean): Promise<Department> => {
    let includeProcessesStr = "";
    if(includeProcesses){
        includeProcessesStr = `?includeProcesses=true`;
    }
    try {
        const response = await axios.get<Department>(`${BASE_URL}/${id}${includeProcessesStr}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching department:", error);
        throw error;
    }
};

const deleteDepartment = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting department with ID ${id}:`, error);
        throw error;
    }
};

const createDepartment = async (data: Department): Promise<Department> => {
    try {
        const response = await axios.post<Department>(BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error adding new department:", error);
        throw error;
    }
};

const updateDepartment = async (data: Department): Promise<Department> => {
    if (!data.id) {
        throw new Error("Department ID is required for updating.");
    }

    try {
        const response = await axios.put<Department>(`${BASE_URL}/${data.id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating the department:", error);
        throw error;
    }
};

export { getAllDepartments, getDepartmentById, deleteDepartment, createDepartment, updateDepartment };
