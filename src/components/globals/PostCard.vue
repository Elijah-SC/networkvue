<script setup>
import { Post } from "@/models/Post.js";



const props = defineProps({
  postProp: { type: Post, required: true }
})
</script>


<template>

  <body class="post-body my-3">
    <div class="d-flex p-2">
      <img :src="postProp.creatorPicture" :alt="postProp.creatorName" class="img-fluid creator-img">
      <div>
        <p class="ms-3">{{ postProp.creatorName }}</p>
        <div class="ms-4 d-flex">
          <p>{{ postProp.createdAt.toLocaleDateString() }}</p>
          <i class="mdi mdi-school ms-2"></i>
        </div>
      </div>
    </div>
    <div>
      <p class="p-2">{{ postProp.body }}</p>
      <img :src="postProp.imgUrl" alt="postImg" class="post-img">
    </div>
    <div class="d-flex justify-content-end p-2 fs-4">
      <i class="mdi mdi-heart-outline text-info me-2"></i>
      <p>{{ postProp.likes.length }}</p>
    </div>
  </body>
</template>


<style lang="scss" scoped>
.post-body {
  box-shadow: 1px 1px 2px black;
}

.creator-img {
  height: 5vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

img {
  object-fit: cover;
  object-position: center;
}

.post-img {
  width: 100%;
  max-height: 50vh;
  aspect-ratio: 1/1;

}
</style>