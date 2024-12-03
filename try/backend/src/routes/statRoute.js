import express from 'express';
import * as statController from '../controllers/statController.js';

const router = express.Router();

router.get('/', statController.getStat);
router.put('/', statController.updateStat);
router.get('/', statController.getTotalCps);

export default router;