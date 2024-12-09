import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { authenticateJWT } from '../middlewares/authenticate.middleware.js';

const router = Router();
router.route('/').get(usersController.getUsers).post(usersController.createUsers)

router.route('/:id').get(authenticateJWT, usersController.getUser)
                    .put(authenticateJWT, usersController.updateUser)
                    .patch(authenticateJWT, usersController.activateInactivate)
                    .delete(authenticateJWT, usersController.deleteUser)

export default router;