<script setup lang="ts">

import Heading1 from "@/components/base/Heading1.vue";
</script>

<template>
  <div class="capture-modal" id="captureModal">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Scan Name Card</h2>
          <button @click="closeModal">X</button>
        </div>
        <div class="modal-body">
          <div class="form">
            <div class="container">
              <Heading1 :msg="greeting"></Heading1>
              <div class="row preview-container d-flex align-items-center" v-if="files.length">
                <div class="col text-center"
                     v-for="file in files"
                     :key="file.id">
                  <div class="position-relative">
                    <img alt="preview name card image" :src="file.src" class="img-fluid" >
                    <button :disabled="isLoading" class="btn btn-sm btn-danger delete-button shadow"
                            v-on:click="removeFile(file)">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="col text-center mt-5">
                <p>Please select a name card image</p>
              </div>
              <form ref="createForm"
                    class="form mt-5 text-center">
                <div class="form-group">
                  <input type="file"
                         accept="image/*"
                         name="files"
                         multiple class="d-none form-control"
                         id="input"
                         ref="fileInput"
                         v-on:change="updateImages"/>
                  <div class="d-flex justify-content-center gap-4">
                    <button type="button"
                            :disabled="isLoading"
                            class="btn btn-primary py-3 px-5 shadow"
                            v-on:click="selectImages">Select</button>
                    <button type="button"
                            v-on:click.prevent="submitNameCard"
                            v-if="files.length"
                            :disabled="isLoading"
                            class="btn btn-success shadow d-flex align-items-center gap-2"
                            :class="{'py-1 px-3':isLoading, 'py-3 px-5':!isLoading}">
                      <div class="d-flex align-items-center gap-2" v-if="isLoading">
                        <div class="spinner-border text-light"
                             role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                        Processing...
                      </div>
                      <span v-else>Submit</span>
                    </button>
                  </div>
                </div>
              </form>

              <button type="button" @click="selectImages" class="position-absolute" id="captureButton">
                <i class="fa-solid fa-camera" ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>