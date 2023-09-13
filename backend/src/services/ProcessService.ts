import { ProcessAttributes, ProcessCreationAttributes, Process } from '../models/Process';
import { Department } from '../models/Department';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';

/**
 * Provides methods for performing CRUD operations on the Process model.
 */
class ProcessService {

    /**
     * Retrieves all processes along with their subprocess count.
     * @returns An array of processes each with a subprocess count.
     */
    async getAll(): Promise<any[]> {
        try {
            return await Process.findAll({
                attributes: [
                    'id',
                    'name',
                    'parentId',
                    'type',
                    'departmentId',
                    [Sequelize.fn('COUNT', Sequelize.col('subProcesses.id')), 'subprocessCount']
                ],
                include: [
                    {
                        model: Process,
                        as: 'subProcesses',
                        attributes: [],
                        duplicating: false
                    }
                ],
                group: ['Process.id']
            });
        } catch (error) {
            console.error("Error fetching processes:", error);
            throw new Error('Erro ao buscar processos.');
        }
    }

    /**
     * Checks if a process with the given name exists.
     * Optionally excludes a process ID from the check.
     * @param name - The name of the process to check.
     * @param ignoreId - The ID of the process to exclude from the check.
     * @returns True if a process with the given name exists, otherwise false.
     */
    async processExistsByName(name: string, ignoreId?: number): Promise<boolean> {
        const process = await Process.findOne({
            where: {
                name,
                ...(ignoreId && { id: { [Op.ne]: ignoreId } })
            }
        });
        return !!process;
    }

    /**
     * Retrieves a process by its ID. Options to include parent process, department, and subprocesses.
     * @param id - The ID of the process to retrieve.
     * @param includeSubprocesses - Whether to include subprocesses.
     * @returns The process or null if not found.
     */
    async getById(id: number, includeSubprocesses: boolean = false): Promise<any | null> {
        try {
            const options = {
                include: [
                    {
                        model: Process,
                        as: 'parentProcess',
                        attributes: ['id', 'name', 'parentId', 'type', 'departmentId']
                    },
                    {
                        model: Department,
                        as: 'department',
                        attributes: ['id', 'name']
                    }
                ]
            };

            if (includeSubprocesses) {
                options.include.push({
                    model: Process,
                    as: 'subProcesses',
                    attributes: ['id', 'name', 'type']
                });
            }

            const process = await Process.findByPk(id, options);
            return process;
        } catch (error) {
            console.error(`Error fetching process with ID ${id}:`, error);
            throw new Error('Erro ao buscar processo.');
        }
    }

    /**
     * Creates a new process based on the provided data.
     * @param data - The data for the new process.
     * @returns The created process.
     * @throws Error if there's any issue during creation.
     */
    async create(data: ProcessCreationAttributes): Promise<Process> {
        try {
            return await Process.create(data);
        } catch (error) {
            console.error("Error creating process:", error);
            throw new Error('Erro ao criar processo.');
        }
    }

    /**
     * Updates an existing process using the provided data.
     * @param id - The ID of the process to update.
     * @param data - The data to update the process with.
     * @returns The updated process.
     * @throws Error if the process is not found or there's any issue during update.
     */
    async update(id: number, data: ProcessAttributes): Promise<Process> {
        try {
            const process = await Process.findByPk(id);
            if (!process) {
                throw new Error('Processo não encontrado.');
            }
            await process.update(data);
            return process;
        } catch (error) {
            console.error(`Error updating process with ID ${id}:`, error);
            throw new Error('Erro ao atualizar processo.');
        }
    }

    /**
     * Deletes a process by its ID.
     * @param id - The ID of the process to delete.
     * @returns True if the deletion was successful, otherwise throws an error.
     * @throws Error if the process is not found or there's any issue during deletion.
     */
    async delete(id: number): Promise<boolean> {
        try {
            const process = await Process.findByPk(id);
            if (!process) {
                throw new Error('Processo não encontrado.');
            }
            await process.destroy();
            return true;
        } catch (error) {
            console.error(`Error deleting process with ID ${id}:`, error);
            throw new Error('Erro ao deletar processo.');
        }
    }
}

export default new ProcessService();
