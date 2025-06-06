import UserManager from "./userManager.js";
import {User} from "../../model/user.js";
import {Post} from "../../model/post.js";

class UserController {
  static async signup(req, res) {
    try {
      const data = req.body;
      const result = await UserManager.signup(data);
      return res.status(200).json({
        message: "[INFO] Data stored successfully!",
        token: result.token,
        user: result.saveUser,
      });
    } catch (error) {
      console.error("[ERROR] Failed to store User data:", error.message);
      res.status(500).json({ error: "[ERROR] Internal Server Error" });
    }
  }

  static async getPaginatedUsersWithPosts(req, res) {
    try {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // 1. Get paginated users
      const users = await User.find({})
        .select('-password -__v')
        .skip(skip)
        .limit(limit)
        .lean();

      // 2. Extract UUIDs of fetched users
      const userUuids = users.map(user => user.uuid);

      // 3. Fetch posts for these users in a single query
      const posts = await Post.find({ uuid: { $in: userUuids } })
      .select('-__v -file')
      .lean();
    

      // 4. Organize posts by user UUID
      const postsByUserUuid = posts.reduce((acc, post) => {
        if (!acc[post.uuid]) {
          acc[post.uuid] = [];
        }
        acc[post.uuid].push(post);
        return acc;
      }, {});
      

      // 5. Combine users with their posts
      const usersWithPosts = users.map(user => ({
        ...user,
        posts: postsByUserUuid[user.uuid] || []
      }));

      // 6. Get total count for pagination
      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);

      return res.status(200).json({
        success: true,
        data: usersWithPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          usersPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      });

    } catch (error) {
      console.error("Error in getPaginatedUsersWithPosts:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  }
}

export default UserController;
