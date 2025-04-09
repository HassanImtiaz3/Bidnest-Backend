import PostManager from "./postManager.js";

class PostController {
  static async storePost(req, res) {
    try {
      const postData = req.body;
      const result = await PostManager.storePost(postData);

      if (result) {
        return res
          .status(200)
          .json({ message: "Post created successfully", post: result });
      } else {
        return res.status(400).json({ message: "Failed to create post" });
      }
    } catch (error) {
      console.error("Error in storing post:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }

  static async getPosts(req, res) {
    try {
      const results = await PostManager.getPosts();
      return res.status(200).json({
        message: "Post Fetch Successfully",
        posts: results,
      });
    } catch (error) {
      console.error("Error in storing post:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
}

export default PostController;
