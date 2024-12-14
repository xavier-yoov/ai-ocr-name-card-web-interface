<template>
  <div class="container">
   <div class="row preview-container d-flex align-items-center">
     <div class="col text-center"
     v-for="file in files"
     :key="file.id">
       <div class="position-relative">
       <img :src="file.src" class="img-fluid" >
       <button :disabled="isLoading" class="btn btn-sm btn-danger delete-button shadow"
       v-on:click="removeFile(file)">
         <i class="fa fa-times" aria-hidden="true"></i>
       </button>
       </div>
     </div>
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
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue';
import {useRoute} from "vue-router";
import axios from "axios";

const route = useRoute()

const userId = route.query.userId as string

const createForm = ref<HTMLFormElement|null>(null)

const fileInput = ref<HTMLInputElement | null>(null)

const isLoading = ref(false)

const files = ref<{id:string, src:any, mimeType:string}[]>([])

const selectImages = ()=>{
  if(fileInput.value){
    fileInput.value.click()
  }
}

const updateImages = ()=>{
  console.log("files", fileInput.value?.files)

  if(fileInput.value?.files){
    for(let i=0; i<fileInput.value.files.length; i++){
      const file = fileInput.value.files[i]
      const reader = new FileReader()
      reader.onload = (e)=>{
        files.value.push({
          id:Math.random().toString(36).substr(2, 9),
          src: URL.createObjectURL(file),
          mimeType: file.type
        })
      }
      reader.readAsDataURL(file)
    }
  }
}

const removeFile = (file:any)=>{
  const index = files.value.findIndex(f=>f.id === file.id)
  if(index > -1){
    files.value.splice(index, 1)
  }
}

const submitNameCard = async()=>{

  isLoading.value = true

  const base_url = process.env.VUE_APP_SERVICE_ENDPOINT

  const instance = axios.create({
    baseURL: base_url
  })

  const formData = new FormData(createForm.value!)

  try{

    const response = await instance.post(`/ocr?userId=${userId}`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const url = response.data.url

    const link = document.createElement('a')
    link.href = url
    const fileName = url.split('/').pop()
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    files.value = []

  }catch (e) {
    console.error(e)
    alert("Something went wrong. Try again later")
  }finally {
    isLoading.value = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preview-container img {
  max-height: 350px;
}

button{
  border-radius: 20%/50%;
}
button.delete-button{
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
</style>
