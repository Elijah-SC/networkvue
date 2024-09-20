<script setup>
import Ad from "@/components/globals/Ad.vue";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { reactive } from "vue";

const editableFormData = reactive({
  searchQuery: ``,
})


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
      </div>
      <div class="col-2">

      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>