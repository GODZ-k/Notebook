import { Note } from "../model/note.model.js";
import { APIError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// get all notes

const getAllNotes = asyncHandler(async(req, res) => {
    try {
        const notes = await Note.find({});

        if (!notes.length) {
            return res.status(200).json(new ApiResponse(200, {}, "No data found"));
        }
        return res
            .status(200)
            .json(new ApiResponse(200, notes, "Notes data fetch successfully"));

    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// create a note

const createNote = asyncHandler(async(req, res) => {
    try {
        const description = req.body.description; // recived data from user

        const localFilePath = req.file ? req.file.path : null; // reciving right file path

        if (!localFilePath) {
            throw new APIError(400, "Missing local file path");
        }

        console.log(localFilePath);

        const noteImage = await uploadOnCloudinary(localFilePath); // upload on cloudinary

        if (!noteImage || !noteImage.url) {
            throw new APIError(400, "missing image link from cloudinary");
        }
        console.log("start");
        const book = await Note.create({
            description,
            image: noteImage.url,
            owner: req.user,
        }); // creating book object

        return res
            .status(201)
            .json(new ApiResponse(201, book, "Note created successfully"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// update a note

const updateNote = asyncHandler(async(req, res) => {
    try {
        const noteId = req.params.id;

        const description = req.body.description;

        // console.log(noteId(owner), req.user._id)
        const noteOwner = await Note.findById(noteId);

        if (noteOwner.owner.toString() !== req.user._id.toString()) {
            return res
                .status(422)
                .json(new ApiResponse(422, {}, "User not Authorized"));
        }

        const imageLocalPath = req.file ? req.file.path : null;

        const image = await uploadOnCloudinary(imageLocalPath);

        let updatedFields = {
            description,
        };

        if (image) {
            updatedFields.image = image.url;
        }

        const note = await Note.findByIdAndUpdate(
            noteId, {
                $set: updatedFields,
            }, { new: true }
        );

        return res
            .status(200)
            .json(new ApiResponse(200, note, "Successfully uploaded"));
    } catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, {}, "Internal server error"));
    }
});

// delete a note

const deleteNote = asyncHandler(async(req, res) => {
    try {
        // console.log(req.user);
        const id = req.body.id;

        // const deletedItam = await Note.findById(id);

        // console.log(deletedItam.owner.toString(), req.user._id.toString())

        // if (deletedItam.owner.toString() !== req.user._id.toString()) {
        //     return res.status(422).json(
        //         new ApiResponse(422, {}, "User not authorized")
        //     )
        // }

        // console.log(id, req.user._id.toString())

        const deleted = await Note.findOneAndDelete({
            _id: id,
            owner: req.user._id,
        });

        // const deleted = await Note.findByIdAndDelete(id);
        // console.log(deleted);

        if (!deleted) {
            return res
                .status(400)
                .json(
                    new ApiResponse(400, {}, "data not found or user not authorized")
                );
        }

        return res
            .status(200)
            .json(new ApiResponse(200, deleted, "Note deleted successfully"));
    } catch (error) {
        console.error("Error:", error);

        return res
            .status(500)
            .json(new ApiResponse(500, {}, "An unexpected error occurred"));
    }
});

export { getAllNotes, createNote, deleteNote, updateNote };