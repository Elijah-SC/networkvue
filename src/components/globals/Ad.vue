<script setup>
import { Ad } from "@/models/Ad.js";



defineProps({
  adProp: { type: Ad, required: true }
})
</script>


<template>

  <body class="my-2">
    <a :href="adProp.AdLink" target="_blank">
      <img :src="adProp.tall" alt="" class="rounded">
    </a>
  </body>
</template>


<style lang="scss" scoped>
img {
  width: 100%;
}
</style>