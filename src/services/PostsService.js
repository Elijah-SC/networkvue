import { Post } from "@/models/Post.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"

class PostsService {
  async getPosts() {
    const response = await api.get(`api/posts`)
    console.log(`got posts in Console `, response.data.posts)
    const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO))

  }

}

export const postsService = new PostsService()