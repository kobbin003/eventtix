import express from "express";
import { updateAddress } from "../controller/profile/updateAddress";
import { updatePersonnels } from "../controller/profile/updatePersonnels";
import passport from "passport";
import { getOrgProfile } from "../controller/profile/getOrgProfile";
import { updateAddressByField } from "../controller/profile/updateAddressByField";
import { updatePersonnelsByField } from "../controller/profile/updatePersonnelByField";
const router = express.Router();

// PUBLIC
// get user profile
router.get("/:orgId", getOrgProfile);

// PRIVATE
// update address
// query: orgId
router.put(
	"/address/:addressId",
	passport.authenticate("jwt", { session: false }),
	updateAddress
);

// PRIVATE
// update address by field
router.put(
	"/addressField/:addressId",
	passport.authenticate("jwt", { session: false }),
	updateAddressByField
);

// PRIVATE
// update personnels
router.put(
	"/personnel/:personnelId",
	passport.authenticate("jwt", { session: false }),
	updatePersonnels
);

// PRIVATE
// update personnels by field
router.put(
	"/personnelField/:personnelId",
	passport.authenticate("jwt", { session: false }),
	updatePersonnelsByField
);

export { router as profileRouter };
