import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { departmentCreateValidations, departmentUpdateValidations } from '../validations/departmentValidations';
import DepartmentService from '../services/DepartmentService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const departments = await DepartmentService.getAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar departamentos.' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const includeProcesses = req.query.includeProcesses === 'true';
        const department = await DepartmentService.getById(+req.params.id, includeProcesses);
        if (!department) {
            return res.status(404).json({ error: 'Departamento não encontrado.' });
        }
        res.json(department);
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});


router.post('/', departmentCreateValidations, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const department = await DepartmentService.create(req.body);
        res.status(201).json(department);
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id', departmentUpdateValidations, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const department = await DepartmentService.update(+req.params.id, req.body);
        res.json(department);
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await DepartmentService.delete(+req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Departamento não encontrado.' });
        }
        res.status(204).send();
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});

export default router;
