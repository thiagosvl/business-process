import { body } from 'express-validator';
import DepartmentService from '../services/DepartmentService';

export const departmentCreateValidations = [
    body('name')
        .isString().withMessage('O nome deve ser uma string')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres')
        .custom(async (name) => {
            const exists = await DepartmentService.departmentExistsByName(name);
            if (exists) {
                throw new Error('O nome do departamento já está em uso.');
            }
            return true;
        }),
];

export const departmentUpdateValidations = [
    body('name')
        .isString().withMessage('O nome deve ser uma string')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres')
        .custom(async (name, { req }) => {
            if (req.params && req.params.id) {
                const exists = await DepartmentService.departmentExistsByName(name, req.params.id);
                if (exists) {
                    throw new Error('O nome do departamento já está em uso.');
                }
            }
            return true;
        }),
];