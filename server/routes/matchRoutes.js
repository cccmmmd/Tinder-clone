import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getUserProfiles, likeUser, dislikeUser, getMatches } from "../controllers/matchController.js";

const router = express.Router();

router.get("/user-profiles", protectRoute, getUserProfiles);

router.post("/like/:userId", protectRoute, likeUser);
router.post("/dislike/:userId", protectRoute, dislikeUser);


router.get("/", protectRoute, getMatches);
export default router;
