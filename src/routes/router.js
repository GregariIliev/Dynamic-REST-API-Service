import { Router } from "express";

import { validateRequest } from '../middleware/validateRequest.js';

import * as actorController from '../controller/actorController.js';

const router = Router();

router.use('/api/:schema', validateRequest);

router.get('/api/mystore-actor/download', actorController.download);

router.get('/api/mystore-actor', actorController.getAll);
router.get('/api/mystore-actor/:id', actorController.getById);
router.post('/api/mystore-actor', actorController.create);
router.delete('/api/mystore-actor/:id', actorController.remove);
router.put('/api/mystore-actor/:id', actorController.update);

export { router };