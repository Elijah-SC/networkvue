import { Post } from "@/models/Post.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async changePage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log(response.data)
    this.handleResponseData(response.data)
  }
  async getPosts() {
    const response = await api.get(`api/posts`)
    console.log(`got posts in Console `, response.data)
    this.handleResponseData(response.data)
  }

  handleResponseData(responseData) {
    const newPosts = responseData.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
    AppState.TotalPages = responseData.totalPages
    AppState.currentPage = responseData.page
  }

}

export const postsService = new PostsService()