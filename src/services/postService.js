import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        if (postData.hashtags && typeof postData.hashtags === 'string') {
            postData.hashtags = postData.hashtags.split(',').map(h => h.trim());
        }

        return await postRepository.create({ ...postData, user: user._id });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostById(postId) {
        return await postRepository.findById(postId);
    }

    async updatePost(postId, postData) {
        if (postData.hashtags && typeof postData.hashtags === 'string') {
            postData.hashtags = postData.hashtags.split(',').map(h => h.trim());
        }
        postData.updatedAt = Date.now();
        return await postRepository.update(postId, postData);
    }

    async deletePost(postId) {
        return await postRepository.delete(postId);
    }
}

export default new PostService();

