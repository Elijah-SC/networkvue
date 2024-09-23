<script setup>
import { AppState } from "@/AppState.js";
import PageSelection from "@/components/globals/PageSelection.vue";
import PostCard from "@/components/globals/PostCard.vue";
import PostForm from "@/components/globals/PostForm.vue";
import Navbar from "@/components/Navbar.vue";
import { addService } from "@/services/AddService.js";
import { postsService } from "@/services/PostsService.js";
import { profileService } from "@/services/ProfileService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
watch(() => route.params.profileId, () => {
  findProfileById()
  getPostsByProfileId()
  getAds()
}, { immediate: true })

onUnmounted(() => clearPosts())

const account = computed(() => AppState.account)
const activeProfile = computed(() => AppState.activeAccount)
const ads = computed(() => AppState.ads)
const posts = computed(() => AppState.posts)

function clearPosts() {
  postsService.clearPosts()
}

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

async function getAds() {
  try {
    await addService.getAds()
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

async function getPostsByProfileId() {
  try {
    const userId = route.params.profileId
    await postsService.getPostsByProfileId(userId)
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}
</script>


<template>

  <body class="container-fluid">
    <section class="row justify-content-between">
      <div class="col-md-2"></div>
      <div class="col-md-10">
        <div>
          <Navbar />
        </div>
        <div class="row justify-content-between">
          <div class="col-md-10">
            <div class="row p-0">
              <div v-if="activeProfile" class="col-12">
                <section class="mx-2 profile-box my-2 p-0">

                  <div class="cover-box">
                    <img :src="activeProfile.coverImg" alt="" class="cover-img">
                    <div class="profile-absolute">
                      <img :src="activeProfile.picture" alt="profilePicture" class="profile-img">
                      <div class="graduated-PA">
                        <i v-if="activeProfile.graduated" class="mdi mdi-school graduated-Icon" title="Graduated"></i>
                        <i v-else class="mdi mdi-desk graduated-Icon" title="Not Graduated"></i>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end p-2 gap-2">
                    <p v-if="activeProfile.class != ``" class="pe-5 fw-bold">Class of {{ activeProfile.class }}</p>
                    <p v-else class="pe-5 fw-bold">Class of {{ new Date().getFullYear() }}</p>
                    <a v-if="activeProfile.linkedin" :href="activeProfile.linkedin" target="_blank"
                      title="linkedIn Link"><i class="mdi mdi-linkedin"></i></a>
                    <a v-if="activeProfile.resume" :href="activeProfile.resume" target="_blank" title="Resume Link"> <i
                        class="mdi mdi-note-text"></i>
                    </a>
                    <a v-if="activeProfile.linkedin" :href="activeProfile.github" target="_blank" title="Github Link">
                      <i class="mdi mdi-github"></i></a>
                  </div>
                  <div class="ps-5 mt-4 d-flex justify-content-center align-items-center gap-1">
                    <h1>{{ activeProfile.name }}</h1>
                    <h2 v-if="account && activeProfile.id == account.id" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" title="edit Account Info" role="button" class="text-success"><i
                        class="mdi mdi-pen"></i></h2>
                  </div>
                  <div class="mt-4 text-center">
                    <p> {{ activeProfile.bio }}</p>
                  </div>
                </section>

              </div>
              <div>
                <div v-if="account && activeProfile && activeProfile.id == account.id">
                  <PostForm />
                </div>
                <div v-for="post in posts" :key="post.id">
                  <PostCard :postProp="post" />
                </div>
                <div>
                </div>
                <div class="sticky-bottom">

                  <PageSelection />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div v-for="ad in ads" :key="ad.title">
              <Ad :adProp="ad" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>


<style lang="scss" scoped>
.profile-img {
  width: 150px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.profile-absolute {
  position: absolute;
  top: 75%;
  right: 70%;
}

.cover-box {
  position: relative;
}

.cover-img {
  width: 100%;
  height: 100%;
  max-height: 40vh;
  object-fit: cover;
  object-position: center;

}

a {
  color: unset;
  font-size: 20px;
}

.graduated-PA {
  position: absolute;
  top: 12px;
  right: 2px;

}

.graduated-Icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  aspect-ratio: 1/1;
  text-align: center;
  background-color: whitesmoke;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 50%;
  font-size: 30px;

}

.profile-box {
  box-shadow: 1px 1px 6px rgb(59, 59, 59);

}
</style>