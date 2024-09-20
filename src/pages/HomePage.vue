<script setup>
import { AppState } from "@/AppState.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";


onMounted(() =>
  getPosts())

const posts = computed(() => AppState.posts)

async function getPosts() {
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}
</script>

<template>

  <body>
    {{ posts }}
  </body>
</template>

<style scoped lang="scss"></style>
