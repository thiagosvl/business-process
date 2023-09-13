import { Department, DepartmentAttributes, DepartmentCreationAttributes } from '../models/Department';
import { Process } from '../models/Process';
import { Sequelize, Op } from 'sequelize';

/**
 * Provides methods for performing CRUD operations on the Department model.
 */
class DepartmentService {

    /**
     * Retrieves all departments along with their associated process count.
     * @returns An array of departments each with a process count.
     */
    async getAll() {
        try {
            const departments = await Department.findAll({
                include: [{
                    model: Process,
                    attributes: [],
                    as: 'processes'
                }],
                attributes: {
                    include: [[Sequelize.fn('COUNT', Sequelize.col('processes.id')), 'processCount']]
                },
                group: ['Department.id']
            });
            return departments;
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw new Error('Erro ao buscar departamentos.');
        }
    }

    /**
     * Checks if a department with the given name exists.
     * Optionally excludes a department ID from the check.
     * @param name - The name of the department to check.
     * @param ignoreId - The ID of the department to exclude from the check.
     * @returns True if a department with the given name exists, otherwise false.
     */
    async departmentExistsByName(name: string, ignoreId?: number): Promise<boolean> {
        const department = await Department.findOne({
            where: {
                name,
                ...(ignoreId && { id: { [Op.ne]: ignoreId } })
            }
        });
        return !!department;
    }

    /**
     * Retrieves a department by its ID. Optionally includes associated processes.
     * @param id - The ID of the department to retrieve.
     * @param includeProcesses - Whether to include the associated processes.
     * @returns The department or null if not found.
     */
    async getById(id: number, includeProcesses: boolean = false): Promise<Department | null> {
        try {
            const department = await Department.findByPk(id, {
                include: includeProcesses ? [{
                    model: Process,
                    as: 'processes'
                }] : undefined
            });
            if (!department) {
                throw new Error('Departamento não encontrado.');
            }
            return department;
        } catch (error) {
            console.error(`Error fetching department with ID ${id}:`, error);
            throw new Error('Erro ao buscar departamento.');
        }
    }

    /**
     * Creates a new department based on the provided data.
     * @param data - The data for the new department.
     * @returns The created department.
     * @throws Error if there's any issue during creation.
     */
    async create(data: DepartmentCreationAttributes): Promise<Department> {
        try {
            const department = await Department.create(data);
            return department;
        } catch (error) {
            console.error("Error creating department:", error);
            throw new Error('Erro ao criar departamento.');
        }
    }

    /**
     * Updates an existing department using the provided data.
     * @param id - The ID of the department to update.
     * @param data - The data to update the department with.
     * @returns The updated department.
     * @throws Error if the department is not found or there's any issue during update.
     */
    async update(id: number, data: DepartmentAttributes): Promise<Department> {
        try {
            const department = await Department.findByPk(id);
            if (!department) {
                throw new Error('Departamento não encontrado.');
            }
            await department.update(data);
            return department;
        } catch (error) {
            console.error(`Error updating department with ID ${id}:`, error);
            throw new Error('Erro ao atualizar departamento.');
        }
    }

    /**
     * Deletes a department by its ID.
     * @param id - The ID of the department to delete.
     * @returns True if the deletion was successful, otherwise throws an error.
     * @throws Error if the department is not found or there's any issue during deletion.
     */
    async delete(id: number): Promise<boolean> {
        try {
            const department = await Department.findByPk(id);
            if (!department) {
                throw new Error('Departamento não encontrado.');
            }
            await department.destroy();
            return true;
        } catch (error) {
            console.error(`Error deleting department with ID ${id}:`, error);
            throw new Error('Erro ao deletar departamento.');
        }
    }
}

export default new DepartmentService();
