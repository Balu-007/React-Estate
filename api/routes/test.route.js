import express from "express";
import { shoulBeLoggedIn, shouldbeAdmin } from "../controller/test.controller.js";

const router = express.Router();

router.get('/should-be-loggedin', shoulBeLoggedIn);
router.get('/should-be-admin', shouldbeAdmin);

export default router;