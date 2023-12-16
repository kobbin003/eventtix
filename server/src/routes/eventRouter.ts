import express from "express";
import { createEvent } from "../controller/events/createEvent";
import passport from "passport";
import { updateEvent } from "../controller/events/updateEvent";
import { deleteEvent } from "../controller/events/deleteEvent";
import { getEventById } from "../controller/events/getEventById";
import { getOrgEvents } from "../controller/events/getOrgEvents";
import { getEventsFiltered } from "../controller/events/getEventsFiltered";

const router = express.Router();

// PRIVATE
// create event
// query: orgId
router.post(
	"/create",
	passport.authenticate("jwt", { session: false }),
	createEvent
);

// PRIVATE
// update event
router.put(
	"/update/:eventId",
	passport.authenticate("jwt", { session: false }),
	updateEvent
);

// PRIVATE
// delete event
router.delete(
	"/delete/:eventId",
	passport.authenticate("jwt", { session: false }),
	deleteEvent
);

// PRIVATE
// get users events
// query: orgId
router.get("/", passport.authenticate("jwt", { session: false }), getOrgEvents);

// PUBLIC
// get event by id
router.get("/:eventId", getEventById);

//!!!!!!!!!!!!!!!!!!
// PUBLIC
// get events by filter: 1. location, 2. time & 3. org name
// query: filter, offset, limit
router.get("/:filter", getEventsFiltered);

export { router as eventRouter };
