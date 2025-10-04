const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

/**
 * GET all comments
 * Retrieves all comments from the database
 * @route GET /api/comments
 * @returns {Array} Array of comment objects
 */
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find();
    return res.json({ comments });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE a comment by ID
 * Deletes a specific comment from the database
 * @route DELETE /api/comments/:id
 * @param {string} id - The comment ID
 * @returns {Object} Success message
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
