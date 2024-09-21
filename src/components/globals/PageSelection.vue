<script setup>
import { AppState } from "@/AppState.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";
import { useRoute } from "vue-router";

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.TotalPages)
const route = useRoute()


async function changePage(pageNumber) {
  const userId = route.params.profileId
  logger.log(`user id`, route)
  try {
    if (route.params.profileId) {
      await postsService.changeProfilePage(pageNumber, userId)
    } else
      if (AppState.postQuery == ``) {
        await postsService.changePage(pageNumber)
      } else {
        await postsService.changeSearchPage(pageNumber, AppState.postQuery)
      }
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}
</script>


<template>

  <body>
    <div v-if="totalPages" class="d-flex justify-content-around p-4 g-4 sticky-bottom">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage < 2" class="m-2 btn btn-outline-dark"
        role="button"> <i class="mdi mdi-arrow-left"></i> Newer </button>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages"
        class="m-2 btn btn-outline-dark" role="button">Older <i class="mdi mdi-arrow-right"></i></button>
    </div>
  </body>
</template>


<style lang="scss" scoped></style>