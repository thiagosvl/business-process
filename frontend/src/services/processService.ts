import axios from 'axios';
import { Process } from '../types/processTypes';

const BASE_URL = 'http://localhost:3001/processs';

const getAllProcesses = async (): Promise<Process[]> => {
    try {
        const response = await axios.get<Process[]>(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching processs:", error);
        throw error;
    }
};

const getProcessById = async (id: string, includeProcesses: boolean): Promise<Process> => {
    let includeProcessesStr = "";
    if(includeProcesses){
        includeProcessesStr = `?includeProcesses=true`;
    }
    try {
        const response = await axios.get<Process>(`${BASE_URL}/${id}${includeProcessesStr}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching process:", error);
        throw error;
    }
};

const deleteProcess = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting process with ID ${id}:`, error);
        throw error;
    }
};

const createProcess = async (data: Process): Promise<Process> => {
    try {
        const response = await axios.post<Process>(BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error adding new process:", error);
        throw error;
    }
};

const updateProcess = async (data: Process): Promise<Process> => {
    if (!data.id) {
        throw new Error("Process ID is required for updating.");
    }

    try {
        const response = await axios.put<Process>(`${BASE_URL}/${data.id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating the process:", error);
        throw error;
    }
};

export { getAllProcesses, getProcessById, deleteProcess, createProcess, updateProcess };
