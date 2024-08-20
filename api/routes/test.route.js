import express from "express";
import { shoulBeLoggedIn, shouldbeAdmin } from "../controller/test.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/should-be-loggedin', verifyToken, shoulBeLoggedIn);
router.get('/should-be-admin', shouldbeAdmin);

export default router;