const express = require("express");
const router = express.Router();

const comments =  require("../data/comments");
const error = require("../utilities/error");

// GET /api/comments
router.get("/", (req, res) => {
    res.json({comments, links: [] });
});

// POST /api/comments
// creating a new comment object
router.post("/", (req, res, next) => {
    const { userId, postId, body } = req.body;

    // Check if the required data is provided
    if ( !userId || !postId || !body ) {
        return next(error(400, "Insufficient data for creating a comment"))
    }

    // Create a new comment
    const newComment = {
        id: comments.length + 1,
        userId,
        postId,
        body,
    };

    // Add the new comment to the comments array
    comments.push(newComment);

    res.status(201).json(newComment);
});

// GET /api/comments/:id
// Retrieves a comment with a specified id
router.get("/:id", (req, res, next) => {
    const commentId = parseInt(req.params.id);
  
    // Find the comment by ID
    const comment = comments.find(comment => comment.id === commentId);
  
    // If comment not found, return a 404 response
    if (!comment) {
      return next(error(404, "Comment not found"));
    }
  
    // Return the comment
    res.json(comment);
  });

// PATCH /comments/:id - updates comment with a specified id with a new body
router.patch("/:id", (req, res, next) => {
    const commentId = parseInt(req.params.id);
    const newBody = req.body.body;

    // Find the comment by ID
    const comment = comments.find(comment => comment.id === commentId);

    // If comment not found return 404 response
    if (!comment) {
        return next(error(404, "Comment not found"));
    }

    // Update the comment's body with the new value
    comment.body = newBody;

    // Return the updated comment
    res.json(comment);
})

// DELETE /api/comments/:id
// delete a comment with the specified id
router.delete("/:id", (req, res, next) => {
    const commentId = parseInt(req.params.id);

    // Find the index of the comment by ID
    const commentIndex = comments.findIndex(comment => comment.id === commentId);

     // If comment not found return 404 response
     if (!comment) {
        return next(error(404, "Comment not found"));
    }

    // Remove the comment from the comments array
    const deletedComment = comments.splice(commentIndex, 1)[0];

    // Return the deleted comment
    res.json(deletedComment);
});

module.exports = router;