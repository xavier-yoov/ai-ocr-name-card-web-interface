<script setup lang="ts">
import {onMounted} from "vue";

import YoovLogo from "@/assets/yoov_logo.png";

onMounted(()=>{
  console.log("Navbar mounted")
})

</script>

<template>
  <nav class="navbar">
    <div class="container-fluid">
      <router-link :to="{name:'Home'}" class="navbar-brand" alt="YOOV Logo" >
        <img :src="YoovLogo" alt="YOOV Logo" class="d-inline-block align-text-top">
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar .navbar-brand img{
  width: 8rem;
  max-width: 200px;
}
</style>
