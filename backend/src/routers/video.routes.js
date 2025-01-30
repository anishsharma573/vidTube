import express from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// ✅ Public route: Anyone can watch videos
router.get("/:videoId", getVideoById);

// ✅ Protected: Only logged-in users can upload videos
router.post(
    "/publish",
    verifyJWT,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    publishAVideo
);

// ✅ Protected: Only owners can update, delete, or toggle video status
router.patch("/update/:videoId", verifyJWT, updateVideo);
router.delete("/:videoId", verifyJWT, deleteVideo);
router.post("/togglevideostatus/:videoId", verifyJWT, togglePublishStatus);

// ✅ Public: Anyone can see all videos
router.get("/", getAllVideos);

export const VideoRoute = router;
