<script setup lang="ts">

import {ref, defineEmits, defineProps} from "vue"



const props = defineProps<{
  debounceTimer?: number
}>()
const searchInput = ref<HTMLInputElement | null>(null)
const clearIcon = ref<HTMLElement | null>(null)

const keywords = ref('')

const emit = defineEmits<{
  search:[keyword:string]
}>()

const clearSearch = () => {
  keywords.value = ''

  search()

  if (searchInput.value) {
    searchInput.value.focus()
  }

  if (clearIcon.value) {
    clearIcon.value.style.display = 'none'
  }
}

// debounce search emit the search event after 500ms only if keywords has value and is different from the previous value
let debounce: number | null = null
const search = () => {

  console.log('this triggered, ', keywords.value)

  if (debounce) {
    clearTimeout(debounce)
  }

  debounce = setTimeout(() => {
    emit('search', keywords.value)
  }, props.debounceTimer ??500)
}




</script>

<template>
  <div class="position-relative">
    <input type="text" class="form-control" ref="searchInput" v-model="keywords" @input="search" placeholder="Search...">
    <span class="clear-icon"  ref="clearIcon" v-show="keywords.length" @click="clearSearch">
      <i class="fa-regular fa-circle-xmark"></i>
    </span>
  </div>
</template>

<style scoped>
  .clear-icon {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #6c757d;
  }
  .position-relative {
    position: relative;
  }
</style>