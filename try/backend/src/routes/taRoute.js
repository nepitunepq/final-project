import express from 'express';
import * as taController from '../controllers/taController.js';

const router = express.Router();

router.get('/', taController.getScore);
router.put('/', taController.updateScore);


export default router;