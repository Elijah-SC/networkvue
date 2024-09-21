<script setup>
import { AppState } from "@/AppState.js";
import Ad from "@/components/globals/Ad.vue";
import PageSelection from "@/components/globals/PageSelection.vue";
import PostCard from "@/components/globals/PostCard.vue";
import { addService } from "@/services/AddService.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, onUnmounted, reactive } from "vue";

onUnmounted(() => {
  clearPosts()
  clearSearchQuery()
}
)
onMounted(() => getAds())

const editableFormData = reactive({
  searchQuery: ``,
})

const posts = computed(() => AppState.posts)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.TotalPages)
const ads = computed(() => AppState.ads)

async function getAds() {
  try {
    await addService.getAds()
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

async function findPostsByQuery() {
  try {
    const query = editableFormData.searchQuery
    await postsService.findPostsByQuery(query)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
function clearPosts() {
  postsService.clearPosts()
}
function clearSearchQuery() {
  postsService.clearSearchQuery()
}
</script>

<template>
  <div class="container-fluid">
    <section class="row justify-content-around">
      <div class="col-2">
        <div></div>
      </div>
      <div class="col-8">
        <div class="text-center my-3">
          <form @submit.prevent="findPostsByQuery()">
            <input v-model="editableFormData.searchQuery" type="text">
            <button><i class="mdi mdi-magnify"></i></button>
          </form>
        </div>
        <div class="row">
          <div v-for="post in posts" :key="post.id" class="col-12">
            <PostCard :postProp="post" />
          </div>
        </div>

        <PageSelection />
      </div>

      <div class="col-2">
        <div v-for="ad in ads" :key="ad.title">
          <Ad :adProp="ad" />
        </div>
      </div>
      <div class="col-12">

      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>