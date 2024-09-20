<script setup>
import { AppState } from "@/AppState.js";
import PostCard from "@/components/globals/PostCard.vue";
import { addService } from "@/services/AddService.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";


onMounted(() => {
  getPosts(), getAds()
}
)

const posts = computed(() => AppState.posts)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.TotalPages)
const adds = computed(() => AppState.ads)

async function getPosts() {
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}
async function changePage(pageNumber) {
  try {
    await postsService.changePage(pageNumber)
  }
  catch (error) {
    Pop.meow(error);
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
</script>

<template>

  <body class="container-fluid">
    <section class="row">
      <div class="col-3"> Fancy Side Bar</div>
      <div class="col-9">
        <div class="row">
          <div class="col-8">
            <div class="row">
              <div v-for="post in posts" :key="post.id" class="col-12">
                <PostCard :postProp="post" />
              </div>

              <div v-if="totalPages" class="d-flex justify-content-around p-4 g-4 ">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage < 2"
                  class="m-2 btn btn-outline-dark" role="button"> <i class="mdi mdi-arrow-left"></i> Newer </button>
                <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages"
                  class="m-2 btn btn-outline-dark" role="button">Older <i class="mdi mdi-arrow-right"></i></button>
              </div>
            </div>
          </div>
          <div class="col-4">
            {{ adds }}
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<style scoped lang="scss"></style>
