<script setup>
import { AppState } from "@/AppState.js";
import { Account } from "@/models/Account.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, reactive } from "vue";

const currentUser = computed(() => AppState.account)
const editableFormData = reactive({
  body: ``,
  imgUrl: ``,
})

async function createPost() {
  try {
    const postData = editableFormData
    await postsService.createPost(postData)
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}
</script>


<template>

  <body v-if="currentUser" class="d-flex m-2 p-1 box-shadow">
    <div class="pe-3">
      <img :src="currentUser.picture" alt="">
    </div>
    <div class="flex-grow-1">
      <form @submit.prevent="createPost()">
        <textarea v-model="editableFormData.body" name="Post" class="text-input form-control p-1"
          placeholder="write your post Here" required maxlength="5000"></textarea>
        <div class="d-flex justify-content-between py-3">

          <div>
            <input v-model="editableFormData.imgUrl" type="text" placeholder="Img or Video Url" maxlength="500">
          </div>
          <div>
            <button class="btn btn-info">Post</button>
          </div>
        </div>
      </form>
    </div>
  </body>

</template>
<style lang="scss" scoped>
img {
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.text-input {
  height: 100px;
}

input {
  width: 300px;
}

.box-shadow {
  box-shadow: 1px 1px 3px black;
}
</style>
