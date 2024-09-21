<script setup>
import { profileService } from "@/services/ProfileService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
watch(() => route.params.profileId, () => {
  findProfileById()
}, { immediate: true })

async function findProfileById() {
  try {
    const profileId = route.params.profileId
    await profileService.findProfileById(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
</script>


<template>

  <body>
    <h1>Profile Page</h1>
  </body>
</template>


<style lang="scss" scoped></style>