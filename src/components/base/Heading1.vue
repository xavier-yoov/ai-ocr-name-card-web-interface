<script setup lang="ts">
import {defineProps} from "vue"

const props = defineProps({
  msg: String
})
</script>

<template>
  <div class="px-3 mb-3">
    <h3>{{msg}}</h3>
  </div>
</template>

<style scoped>

</style>