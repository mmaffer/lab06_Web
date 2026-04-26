import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async renderCreateForm(req, res) {
        try {
            const users = await userRepository.findAll();
            res.render("edit_post", { post: null, users });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async create(req, res) {
        try {
            const { userId, ...postData } = req.body;
            await postService.createPost(userId, postData);
            res.redirect("/posts");
        } catch (error) {
            const users = await userRepository.findAll();
            res.render("edit_post", { post: null, users, error: error.message });
        }
    }

    async renderEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            const users = await userRepository.findAll();
            res.render("edit_post", { post, users });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async update(req, res) {
        try {
            const { userId, ...postData } = req.body;
            // Si el userId cambia, también lo actualizamos en el postData
            if (userId) postData.user = userId;
            
            await postService.updatePost(req.params.id, postData);
            res.redirect("/posts");
        } catch (error) {
            const post = await postService.getPostById(req.params.id);
            const users = await userRepository.findAll();
            res.render("edit_post", { post, users, error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new PostController();
