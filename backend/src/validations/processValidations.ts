import { body, CustomValidator } from 'express-validator';
import ProcessService from '../services/ProcessService';
import { ProcessType } from '../models/Process';

const validateParentProcess: CustomValidator = async (parentId: number, { req }) => {
    if (parentId !== null && typeof parentId === 'number') {
        if (req.params && +req.params.id === parentId) {
            throw new Error('Um processo não pode ser seu próprio processo pai.');
        }
        
        const processExists = await ProcessService.getById(parentId);
        if (!processExists) {
            throw new Error('O processo pai informado não existe.');
        }
    }
    return true;
};


export const processCreateValidations = [
    body('name')
        .isString().withMessage('O nome deve ser uma string')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres')
        .custom(async (name) => {
            const exists = await ProcessService.processExistsByName(name);
            if (exists) {
                throw new Error('O nome do processo já está em uso.');
            }
            return true;
        }),

    body('parentId')
        .optional({ nullable: true })
        .isInt({ gt: 0 }).withMessage('O ID do processo pai é inválido')
        .custom(validateParentProcess),

    body('type')
        .isString().withMessage('O tipo deve ser uma string')
        .isIn(Object.values(ProcessType)).withMessage(`O tipo deve ser um dos seguintes valores: ${Object.values(ProcessType).join(', ')}`),

    body('departmentId')
        .isInt({ gt: 0 }).withMessage('o ID do departamento é inválido')
];



export const processUpdateValidations = [
    body('name')
        .isString().withMessage('O nome deve ser uma string')
        .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres')
        .custom(async (name, { req }) => {
            if (req.params && req.params.id) {
                const exists = await ProcessService.processExistsByName(name, req.params.id);
                if (exists) {
                    throw new Error('O nome do processo já está em uso.');
                }
            }
            return true;
        }),

    body('parentId')
        .optional({ nullable: true })
        .isInt({ gt: 0 }).withMessage('O ID do processo pai é inválido')
        .custom(validateParentProcess),

    body('type')
        .isString().withMessage('O tipo deve ser uma string')
        .isIn(Object.values(ProcessType)).withMessage(`O tipo deve ser um dos seguintes valores: ${Object.values(ProcessType).join(', ')}`),

    body('departmentId')
        .isInt({ gt: 0 }).withMessage('o ID do departamento é inválido')
];