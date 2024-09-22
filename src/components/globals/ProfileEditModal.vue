<script setup>
import { AppState } from "@/AppState.js";
import { computed, reactive } from "vue";

const activeAccount = computed(() => AppState.activeAccount)

const editableFormData = reactive({
  name: ``,
  picture: ``,
  bio: ``,
  coverImg: ``,
  resume: ``,
  github: ``,
  linkedin: ``,
  graduated: false,
  class: ``,
})
</script>


<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Account Info</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" :placeholder="editableFormData.name" class="form-control"
                v-model="editableFormData.name" maxlength="100" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Bio</label>
              <textarea v-model="editableFormData.bio" type="text" maxlength="1000" class="form-control"
                id="exampleInputPassword1"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">coverImg</label>
              <input v-model="editableFormData.coverImg" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Picture</label>
              <input v-model="editableFormData.picture" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Resume</label>
              <input v-model="editableFormData.resume" :placeholder="editableFormData.resume" type="text"
                maxlength="500" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">linkedIn</label>
              <input v-model="editableFormData.linkedin" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Github</label>
              <input v-model="editableFormData.github" type="text" maxlength="500" class="form-control"
                id="exampleInputPassword1">
            </div>
            <div class="mb-3">
              <label class="form-label">Graduation Class</label>
              <input v-model="editableFormData.class" type="text" maxlength="100" class="form-control"
                id="exampleInputPassword1">
            </div>

            <div class="mb-3 form-check">
              <input :checked="activeAccount.graduated" type="graduated" class="form-check-input" id="exampleCheck1">
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