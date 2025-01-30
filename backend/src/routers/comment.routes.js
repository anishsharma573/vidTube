import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { addComment, getVideoComments, updateComment, deleteComment } from "../controllers/comment.controllers.js";

const router = Router();

router.post("/addcomments/:videoId", verifyJWT, addComment);
router.get("/comments/:videoId", getVideoComments);
router.put("/updatecomment/:commentId", verifyJWT, updateComment);
router.delete("/deletecomment/:commentId", verifyJWT, deleteComment);

export const CommentRoute = router;
