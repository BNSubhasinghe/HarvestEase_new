import express from 'express';
import { getProfits } from '../controllers/profitsController.js';

const router = express.Router();

router.get('/', getProfits);

export default router;