<script setup>
import { AppState } from "@/AppState.js";
import { Post } from "@/models/Post.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";

const account = computed(() => AppState.account)

const props = defineProps({
  postProp: { type: Post, required: true }
})

async function deletePost() {
  try {
    const UserWantsToDelete = await Pop.confirm(`are you sure you want to Delete this post`)
    if (!UserWantsToDelete) return
    logger.log(`deletingPost`)
    await postsService.deletePost(props.postProp.id)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
async function likePost() {
  try {
    const postId = props.postProp.id
    await postsService.likePost(postId)
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}
</script>


<template>

  <body class="post-body my-3">
    <div class="d-flex p-2">
      <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
        <img :src="postProp.creatorPicture" :alt="postProp.creatorName" class="img-fluid creator-img">
      </router-link>
      <div>
        <div>
          <p class="ms-3">{{ postProp.creatorName }}</p>
          <div class="ms-4 d-flex posted-Dated">
            <p>{{ postProp.createdAt.toLocaleDateString() }}</p>
            <i v-if="postProp.creatorGraduatedBool" class="mdi mdi-school ms-2"></i>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="p-2">{{ postProp.body }}</p>
      <img v-if="postProp.imgUrl != ``" :src="postProp.imgUrl" alt="postImg" class="post-img">
    </div>
    <div class="d-flex justify-content-between p-2 fs-4">
      <div class="fs-5"> <button @click="deletePost()" v-if="account && postProp.creatorId == account.id"
          class="btn btn-danger">Delete</button></div>
      <div>
        <div v-if="account" @click="likePost()" class="d-flex gap-2">
          <i v-if="postProp.likes.some(obj => obj.id == account.id)" role="button" class="mdi mdi-heart text-info"
            title="unlike post"></i>
          <i v-else role="button" class="mdi mdi-heart-outline text-info" title="like post"></i>
          <p>{{ postProp.likes.length }}</p>
        </div>
        <div v-else class="d-flex gap-2">
          <i class="mdi mdi-heart text-info" title="likes"></i>
          <p>{{ postProp.likes.length }}</p>
        </div>
      </div>
    </div>
  </body>
</template>


<style lang="scss" scoped>
.post-body {
  box-shadow: 1px 1px 2px black;
}

.creator-img {
  height: 5vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

img {
  object-fit: cover;
}

.post-img {
  width: 100%;
  height: 100%;
  max-height: 70vh;

}

.posted-Dated {
  font-size: 11px;
}
</style>