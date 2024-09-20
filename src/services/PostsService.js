import { Post } from "@/models/Post.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { AppState } from "@/AppState.js"

class PostsService {
  clearSearchQuery() {
    AppState.postQuery = ``
  }
  async changeSearchPage(pageNumber, query) {
    const response = await api.get(`api/posts?page=${pageNumber}&query=${query}`)
    logger.log(`changing SearchPage`, response.data)
    this.handleResponseData(response.data)
  }
  async findPostsByQuery(query) {
    const response = await api.get(`api/posts?query=${query}`)
    logger.log(`got posts with query of ${query}`, response.data)
    this.handleResponseData(response.data)
    AppState.postQuery = query
    logger.log(`Query in AppState`, AppState.postQuery)
  }
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

  clearPosts() {
    AppState.posts = []
    AppState.currentPage = 0
    AppState.TotalPages = 0
  }

  handleResponseData(responseData) {
    const newPosts = responseData.posts.map(postPOJO => new Post(postPOJO))
    AppState.posts = newPosts
    AppState.TotalPages = responseData.totalPages
    AppState.currentPage = responseData.page
  }

}

export const postsService = new PostsService()