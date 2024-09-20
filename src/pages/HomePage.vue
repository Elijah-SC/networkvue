<script setup>
import { AppState } from "@/AppState.js";
import PostCard from "@/components/globals/PostCard.vue";
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

  <body class="container-fluid">
    <section class="row">
      <div class="col-3"> Fancy Side Bar</div>
      <div class="col-9">
        <div class="row">
          <div class="col-8"> POSTS
            <div class="row">
              <div v-for="post in posts" :key="post.id" class="col-12">
                <PostCard :postProp="post" />
              </div>
            </div>
          </div>
          <div class="col-4"> ADDs</div>
        </div>
      </div>
    </section>
  </body>
</template>

<style scoped lang="scss"></style>
