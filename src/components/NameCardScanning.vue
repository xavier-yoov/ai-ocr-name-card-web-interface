<template>
  <div class="container">
    <Heading1 :msg="greeting"></Heading1>
    <div class="row preview-container d-flex align-items-center" v-if="files.length">
      <div class="col text-center"
           v-for="file in files"
           :key="file.id">
        <div class="position-relative">
          <img alt="preview name card image" :src="file.src" class="img-fluid">
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
                  v-if="showSelectImageButton"
                  :disabled="isLoading"
                  class="btn btn-primary py-3 px-5 shadow"
                  v-on:click="selectImages">Select
          </button>
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

    <div class="text-center" v-if="newNameCardId">
      <router-link class="btn btn-primary mt-5 shadow rounded-5" :to="{name:'Contact Detail', params:{id: newNameCardId}}" >
        <i class="fa-regular fa-address-card"></i> View Name Card
      </router-link>
    </div>
    <button type="button"
            id="captureButton"
            v-if="showSelectImageButton"
            :disabled="isLoading"
            class="btn btn-primary shadow"
            v-on:click="captureImage">
      <i class="fa-solid fa-camera"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>

import {computed, ref, onMounted, nextTick} from 'vue';
import {get, post} from "@/api";
import {me, ocr, refresh} from "@/api/endpoints";
import Heading1 from "@/components/base/Heading1.vue";
import Navbar from "@/components/Navbar.vue";
import CaptureModal from "@/components/CaptureModal.vue";

// const _user = JSON.parse(localStorage.getItem('user') as string)
const user = ref(JSON.parse(localStorage.getItem('user') as string))
// const user = ref(_user)

const greeting = computed(() => {
  if (new Date().getHours() < 12) return `Good Morning, ${user.value?.name}`
  if (new Date().getHours() < 18) return `Good Afternoon, ${user.value?.name}`
  return `Good Evening, ${user.value?.name}`
})
const createForm = ref<HTMLFormElement | null>(null)

const fileInput = ref<HTMLInputElement | null>(null)

const newNameCardId = ref<string|null>(null)

const isLoading = ref(false)

const coordinates = ref({latitude: 0, longitude: 0})

const maxFiles = 2

const files = ref<{ id: string, src: any, mimeType: string }[]>([])

const showAddToHomeScreenButton = ref(false)

const selectImages = () => {
  fileInput.value?.removeAttribute('capture')
  fileInput.value?.click()
}

const captureImage = () => {
  fileInput.value?.setAttribute('capture', 'environment')
  console.log("capture image")
  fileInput.value?.click()
}

const updateImages = () => {
  console.log("files", fileInput.value?.files)

  if (fileInput.value?.files) {

    if (fileInput.value.files.length + files.value.length > maxFiles) {
      alert(`You can only upload ${maxFiles} files`)
      return
    }

    for (let i = 0; i < fileInput.value.files.length; i++) {
      const file = fileInput.value.files[i]
      const reader = new FileReader()
      reader.onload = (e) => {
        files.value.push({
          id: Math.random().toString(36).substr(2, 9),
          src: URL.createObjectURL(file),
          mimeType: file.type
        })
      }
      reader.readAsDataURL(file)
    }
  }
}

const removeFile = (file: any) => {
  const index = files.value.findIndex(f => f.id === file.id)
  if (index > -1) {
    files.value.splice(index, 1)
  }
}

const submitNameCard = async () => {

  isLoading.value = true

  const formData = new FormData(createForm.value!)

  formData.append('latitude', coordinates.value.latitude.toString())
  formData.append('longitude', coordinates.value.longitude.toString())

  try {
    const response = await post(ocr, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    newNameCardId.value = response.data.nameCardData.id

    const msg = `You have successfully submitted.`

    alert(msg)

    files.value = []
    fileInput.value!.value = ''

    // const url = response.data.url
    //
    // const link = document.createElement('a')
    // link.href = url
    // const fileName = url.split('/').pop()
    // link.setAttribute('download', fileName)
    // document.body.appendChild(link)
    // link.click()


  } catch (e) {
    console.error(e)
    alert("Something went wrong. Try again later")
  } finally {
    isLoading.value = false
  }
}

const showSelectImageButton = computed(() => {
  return files.value.length < maxFiles
})

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

const showPosition =(position:any)=> {

  coordinates.value = {latitude: position.coords.latitude, longitude: position.coords.longitude}
  console.log("Latitude: " + position.coords.latitude +
      "Longitude: " + position.coords.longitude);
}

getLocation()

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preview-container img {
  max-height: 300px;
}

button {
  border-radius: 20%/50%;
}

button.delete-button {
  position: absolute;
  top: 10%;
  right: 15%;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  text-align: center;
}

button#captureButton {
  position:absolute;
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  right: 1rem;
  bottom: 5rem;
  border-radius: 50%;
}


</style>
