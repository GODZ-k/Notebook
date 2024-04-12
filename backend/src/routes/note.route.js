import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNote, getAllNotes, updateNote, deleteNote } from "../controllers/note.controller.js";
const router = Router()


// get all notes 

router.route("").get(getAllNotes)


// create a note 

router.route("/create").post(verifyJWT, upload.single("image"), createNote)


// update a note 

router.route("/update/:id").patch(verifyJWT, upload.single("image"), updateNote)


// delete a note 

router.route("/delete").post(verifyJWT, deleteNote)

export default router