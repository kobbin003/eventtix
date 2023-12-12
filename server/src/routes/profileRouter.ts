import express from "express";
const router = express.Router();
// update address
router.patch("/address");

// update personnels
router.patch("/personnel");
export { router as profileRouter };
