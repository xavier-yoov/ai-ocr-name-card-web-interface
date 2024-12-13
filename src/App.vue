<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img :src="YOOVLogo" class="d-inline-block align-text-top">
      </a>
    </div>
  </nav>
  <router-view/>
</template>

<script setup lang="ts">
import YOOVLogo from '@/assets/yoov-logo.png'
</script>


<style scoped>
.navbar .navbar-brand img{
  width: 8rem;
  max-width: 200px;
}
</style>
