import { Post } from "@/models/Post.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class PostsService {
  async likePost(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    const newPost = new Post(response.data)
    const postIndex = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postIndex, 1, newPost)
  }
  updateActiveAccount(account) {
    AppState.activeAccount = account
  }
  async getPostsByProfileId(userId) {
    const response = await api.get(`/api/profiles/${userId}/posts`)
    this.handleResponseData(response.data)
  }
  async deletePost(postId) {
    const response = await api.delete(`api/posts/${postId}`)

    const foundPost = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(foundPost, 1)
  }
  async createPost(postData) {
    const response = await api.post(`api/posts`, postData)

    const newPost = new Post(response.data)
    AppState.posts.unshift(newPost)
  }
  clearSearchQuery() {
    AppState.postQuery = ``
  }
  async changeProfilePage(pageNumber, userId) {
    const response = await api.get(`/api/profiles/${userId}/posts?page=${pageNumber}`)
    this.handleResponseData(response.data)
  }
  async changeSearchPage(pageNumber, query) {
    const response = await api.get(`api/posts?page=${pageNumber}&query=${query}`)
    this.handleResponseData(response.data)
  }
  async findPostsByQuery(query) {
    const response = await api.get(`api/posts?query=${query}`)
    this.handleResponseData(response.data)
    AppState.postQuery = query
  }
  async changePage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    this.handleResponseData(response.data)
  }
  async getPosts() {
    const response = await api.get(`api/posts`)
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