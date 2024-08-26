import express from "express";
import { deleteUser, getUser, getUsers, updateUser, savePost, profilePosts } from "../controller/user.controller.js";
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/',  getUsers);
// router.get('/:id', verifyToken, getUser); we are not fetching single user and to avoid colliding with profiePosts
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/save', verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);

export default router;