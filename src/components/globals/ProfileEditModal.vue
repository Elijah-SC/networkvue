<script setup>
import { AppState } from "@/AppState.js";
import { accountService } from "@/services/AccountService.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref, watch } from "vue";

const account = computed(() => AppState.account)
const activeAccount = computed(() => AppState.activeAccount)

const editableAccountData = ref({
  name: ``,
  picture: ``,
  bio: ``,
  coverImg: ``,
  resume: ``,
  github: ``,
  linkedin: ``,
  class: ``,
  graduated: false
})
watch(() => AppState.account, () => {

  editableAccountData.value = { ...AppState.account }
}, { immediate: true })


async function updateProfileInfo() {
  try {
    const profileData = editableAccountData.value
    await accountService.updateProfileInfo(profileData)
    Pop.success(`changes Saved`)
    if (activeAccount.value.id == account.value.id) {
      logger.log(`updating ActiveAccount with account`, account.value)
      await postsService.updateActiveAccount(account.value)
    }
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}
</script>


<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Account Info</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-if="account" class="modal-body">
          <form @submit.prevent="updateProfileInfo()">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" :placeholder="editableAccountData.name" class="form-control"
                v-model="editableAccountData.name" maxlength="100" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Bio</label>
              <textarea v-model="editableAccountData.bio" type="text" maxlength="1000" class="form-control"
                id="exampleInputPassword1"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">coverImg</label>
              <input v-model="editableAccountData.coverImg" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Picture</label>
              <input v-model="editableAccountData.picture" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Resume</label>
              <input v-model="editableAccountData.resume" :placeholder="editableAccountData.resume" type="text"
                maxlength="500" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">linkedIn</label>
              <input v-model="editableAccountData.linkedin" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Github</label>
              <input v-model="editableAccountData.github" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Graduation Class</label>
              <input v-model="editableAccountData.class" type="text" maxlength="100" class="form-control"
                id="exampleInputPassword1">
            </div>

            <div class="mb-3 form-check">
              <input v-model="editableAccountData.graduated" type="checkbox" class="form-check-input"
                id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Graduated</label>
            </div>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>