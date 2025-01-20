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
      <router-link :to="{name:'welcome'}" class="navbar-brand" alt="YOOV Logo" >
        <img :src="YoovLogo" alt="YOOV Logo" class="d-inline-block align-text-top">
      </router-link>
<!--      <router-link class="btn btn-outline-success" :to="{name:'login'}">Login</router-link>-->
      <router-link class="btn btn-outline-success" :to="{name:'register'}">Sign Up</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar .navbar-brand img{
  width: 8rem;
  max-width: 200px;
}
</style>
