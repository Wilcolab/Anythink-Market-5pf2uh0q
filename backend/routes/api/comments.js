/**
 * Express router for comment-related API endpoints.
 *
 * Provides endpoints to list and delete Comment documents stored via Mongoose.
 *
 * Routes:
 *   GET /
 *     - Description: Retrieve all comments.
 *     - Success: 200 OK with JSON array of Comment documents.
 *       Example: [ { _id, text, author, createdAt, ... }, ... ]
 *     - Error: 500 Internal Server Error
 *       Example: { error: "Failed to fetch comments" }
 *
 *   DELETE /:id
 *     - Description: Delete a single comment by its MongoDB ObjectId.
 *     - Path Parameters:
 *         - id {string} - The MongoDB ObjectId of the comment to delete.
 *     - Validation:
 *         - Returns 400 Bad Request if `id` is not a valid ObjectId:
 *           { error: "Invalid comment id" }
 *     - Success:
 *         - 200 OK with a message and the deleted comment document:
 *           { message: "Comment deleted successfully", comment: { _id, text, author, createdAt, ... } }
 *     - Not Found:
 *         - 404 Not Found if no comment exists with the provided id:
 *           { error: "Comment not found" }
 *     - Error:
 *         - 500 Internal Server Error on deletion failure:
 *           { error: "Failed to delete comment" }
 *
 * Notes:
 *   - Uses mongoose.Types.ObjectId.isValid to validate the `id` parameter.
 *   - Assumes a Mongoose model named "Comment" is registered and used for queries.
 *
 * @module routes/api/comments
 * @requires express.Router
 * @requires mongoose
 *
 * @returns {import('express').Router} Configured Express router for comment APIs.
 */
// Hey GitHub Copilot, this file is located at backend/routes/api/comments.js

const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid comment id" });
        }

        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully", comment: deletedComment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

module.exports = router;
