import PostHandler from "../../handlers/postHandler.js";

class PostManager {
  static async storePost(postData) {
    try {
      const newPost = await PostHandler.storePost(postData);
      return newPost;
    } catch (error) {
      console.error('[ERROR] Error while saving post data:', error.message);
      throw error;
    }
  }

  static async getPosts(){
    try {
        const posts = await PostHandler.getPosts();
        return posts;
    } catch (error) {
        console.error('[ERROR] Error while getting post data:', error.message);
        throw error;
    }
  }

}

export default PostManager;
