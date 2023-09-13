import { Router } from 'express';
import departmentRoutes from './departmentsRoutes';
import processRoutes from './processesRoutes';

const router = Router();

router.use('/departments', departmentRoutes);
router.use('/processes', processRoutes);

export default router;