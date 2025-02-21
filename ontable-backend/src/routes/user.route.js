import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js";
import { 
  loginUser, 
  registerUser, 
  refreshAccessToken, 
  getCurrentUser, 
  logoutUser 
} from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').post(verifyJWT, refreshAccessToken);
router.route('/current-user').get(verifyJWT, getCurrentUser);

export default router;