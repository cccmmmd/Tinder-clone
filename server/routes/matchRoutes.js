import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getUserProfiles, likeUser, dislikeUser, getMatches } from "../controllers/matchController.js";

const router = express.Router();

router.use(protectRoute);

router.get("/user-profiles", getUserProfiles);

router.post("/like/:userId", likeUser);
router.post("/dislike/:userId", dislikeUser);


router.get("/", getMatches);
export default router;
