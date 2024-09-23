<script setup>
import { AppState } from "@/AppState.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, reactive } from "vue";

const account = computed(() => AppState.account)

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

  <body class="container">

    <div v-if="account" class="row justify-content-between m-2 p-1 box-shadow rounded">

      <div class="col-12 col-lg-2 pe-3 text-center mb-3 d-flex flex-column justify-content-around">
        <div>
          <router-link :to="{ name: 'Profile', params: { profileId: account.id } }">
            <img :src="account.picture" alt="">
          </router-link>
        </div>
      </div>
      <div class="col-lg-10">
        <form class="row mb-3 justify-content-between" @submit.prevent="createPost()">
          <textarea v-model="editableFormData.body" name="Post" class="col-12 text-input form-control p-1 ps-2 mb-3"
            placeholder="Write your post Here" required maxlength="5000"></textarea>

          <div class="col-md-10 px-0">
            <input class="form-control w-100 mb-3" v-model="editableFormData.imgUrl" type="text"
              placeholder="Img or Video Url" maxlength="500">
          </div>
          <div class="col-md-2 text-md-end text-center">
            <button class="btn btn-info">Post</button>
          </div>
        </form>

      </div>
    </div>
  </body>

</template>
<style lang="scss" scoped>
img {
  height: 75px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 2px solid #0a76bb;
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
