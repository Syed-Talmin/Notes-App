import { Router } from "express";
import * as authController from "../controller/auth.controller.js";
import * as authValidator from "../validator/auth.validator.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router = Router();


router.post('/register',authValidator.userRegister, authController.userRegister)
router.post('/login',authValidator.userLogin, authController.userLogin)
router.get('/logout', authController.userLogout)
router.get('/profile',authMiddleware, authController.userProfile)

export default router