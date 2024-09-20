<script setup>
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { onMounted } from "vue";


onMounted(() =>
  getPosts())

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

  </body>
</template>

<style scoped lang="scss"></style>
