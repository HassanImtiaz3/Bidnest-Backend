import { Post } from "../model/post.js";

class PostHandler {
  static async storePost(postData) {
    try {
      const newPost = new Post(postData);
      console.log("new post data", newPost);
      await newPost.save();
      return newPost;
    } catch (error) {
      console.error("Error while saving post:", error);
      throw new Error("Error saving post to database");
    }
  }

  static async getPosts() {
    try {
      const posts = await Post.findOne().sort({ created_at: -1 }).exec();
      return posts;
    } catch (error) {
      console.error("Error while getting post:", error);
      throw new Error("Error getting post from database");
    }
  }
}

export default PostHandler;
