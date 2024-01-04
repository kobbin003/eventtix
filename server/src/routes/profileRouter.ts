import express from "express";
import { updateAddress } from "../controller/profile/updateAddress";
import { updatePersonnels } from "../controller/profile/updatePersonnels";
import passport from "passport";
import { getOrgProfile } from "../controller/profile/getOrgProfile";
import { updateAddressByField } from "../controller/profile/updateAddressByField";
import { updatePersonnelsByField } from "../controller/profile/updatePersonnelByField";
import { getCurrentOrgAddress } from "../controller/profile/getCurrentOrgAddress";
import { getCurrentOrgPersonnels } from "../controller/profile/getCurrentOrgPersonnels";
import { getCurrentOrgProfile } from "../controller/profile/getCurrentOrgProfile";
import { getPersonnelsAddressByOrgId } from "../controller/profile/getPersonnelsAddressByOrgId";
import { getCurrentOrgPayment } from "../controller/profile/getCurrentOrgPayment";
const router = express.Router();

// PUBLIC
// get profile by id
router.get("/org/:orgId", getOrgProfile);

// PUBLIC
// get personnels by orgId
router.get("/org/:orgId/addNpers", getPersonnelsAddressByOrgId);

// PRIVATE
// get current org profile
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	getCurrentOrgProfile
);

// PRIVATE
// get current user address
router.get(
	"/address",
	passport.authenticate("jwt", { session: false }),
	getCurrentOrgAddress
);

// PRIVATE
// get current user payment record
router.get(
	"/payment",
	passport.authenticate("jwt", { session: false }),
	getCurrentOrgPayment
);

// PRIVATE
// get current user personnels
router.get(
	"/personnels",
	passport.authenticate("jwt", { session: false }),
	getCurrentOrgPersonnels
);

// PRIVATE
// update address
// query: orgId
router.put(
	"/address",
	passport.authenticate("jwt", { session: false }),
	updateAddress
);

// PRIVATE
// update address by field
router.put(
	"/addressField",
	passport.authenticate("jwt", { session: false }),
	updateAddressByField
);

// PRIVATE
// update personnels
router.put(
	"/personnels",
	passport.authenticate("jwt", { session: false }),
	updatePersonnels
);

// PRIVATE
// update personnels by field
router.put(
	"/personnelField",
	passport.authenticate("jwt", { session: false }),
	updatePersonnelsByField
);

export { router as profileRouter };
