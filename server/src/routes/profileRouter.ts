import express from "express";
import { updateAddress } from "../controller/profile/updateAddress";
import { updatePersonnels } from "../controller/profile/updatePersonnels";
import passport from "passport";
import { getOrgProfile } from "../controller/profile/getOrgProfile";
const router = express.Router();

// PUBLIC
// get user profile
router.get("/:orgId", getOrgProfile);

// PRIVATE
// update address
router.put(
	"/address",
	passport.authenticate("jwt", { session: false }),
	updateAddress
);

// PRIVATE
// update personnels
router.put(
	"/personnel",
	passport.authenticate("jwt", { session: false }),
	updatePersonnels
);

export { router as profileRouter };
