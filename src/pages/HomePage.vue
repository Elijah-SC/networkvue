<script setup>
import { AppState } from "@/AppState.js";
import Ad from "@/components/globals/Ad.vue";
import PageSelection from "@/components/globals/PageSelection.vue";
import PostCard from "@/components/globals/PostCard.vue";
import PostForm from "@/components/globals/PostForm.vue";
import Navbar from "@/components/Navbar.vue";
import { addService } from "@/services/AddService.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, onUnmounted } from "vue";


onMounted(() => {
  getPosts(), getAds()
}
)

onUnmounted(() => {
  clearPosts()
})

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)

async function getPosts() {
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}


async function getAds() {
  try {
    await addService.getAds()
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

function clearPosts() {
  postsService.clearPosts()
}
</script>

<template>

  <body class="container-fluid">
    <section class="row justify-content-between">
      <div class="col-md-2"></div>
      <div class="col-md-10">
        <div>
          <Navbar />
        </div>
        <div class="row justify-content-between">
          <div class="col-md-10">
            <div class="row">
              <div>
                <PostForm />
              </div>
              <div v-for="post in posts" :key="post.id" class="col-12">
                <PostCard :postProp="post" />
              </div>
              <div class="sticky-bottom">
                <PageSelection />
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div v-for="ad in ads" :key="ad.title">
              <Ad :adProp="ad" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>

</template>

<style scoped lang="scss"></style>
