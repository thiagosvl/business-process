import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { processCreateValidations, processUpdateValidations } from '../validations/processValidations';
import ProcessService from '../services/ProcessService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const processes = await ProcessService.getAll();
        res.json(processes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar processos.' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const includeSubprocesses = req.query.includeSubprocesses === 'true';
    try {
        const processItem = await ProcessService.getById(+req.params.id, includeSubprocesses);
        if (!processItem) {
            return res.status(404).json({ error: 'Processo não encontrado.' });
        }
        res.json(processItem);
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});

router.post('/', processCreateValidations, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const processItem = await ProcessService.create(req.body);
        res.status(201).json(processItem);
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});

router.put('/:id', processUpdateValidations, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedProcess = await ProcessService.update(+req.params.id, req.body);
        if (!updatedProcess) {
            return res.status(404).json({ message: 'Processo não encontrado.' });
        }
        res.json(updatedProcess);
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const result = await ProcessService.delete(+req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Processo não encontrado.' });
        }
        res.status(204).send();
    } catch (error) {
        const e = error as Error;
        res.status(500).json({ error: e.message });
    }
});

export default router;
