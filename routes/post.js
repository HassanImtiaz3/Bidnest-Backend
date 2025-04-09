import express from "express"
import PostController from "../app/post/postController.js";
const router = express.Router();

router.post("/create-post", PostController.storePost)
router.get("/post", PostController.getPosts)

export default router