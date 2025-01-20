<script setup lang="ts">
import {defineProps} from "vue"

const props = defineProps({
  msg: String
})
</script>

<template>
  <div class="px-3 mb-3">
    <h3 class="m-0 p-0">{{msg}}</h3>

    <slot></slot>
  </div>
</template>

<style scoped>

</style>