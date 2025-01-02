<script setup lang="ts">
import {onMounted} from "vue";

import YoovLogo from "@/assets/yoov_logo.png";

onMounted(()=>{
  console.log("BottomNavbar mounted")
})

</script>

<template>
  <footer class="bg-transparent footer mt-auto py-3 bg-light sticky-bottom">
    <div class="container d-flex flex-row justify-content-around">
      <router-link :to="{name:'Capture'}">
        <i class="fa-solid fa-camera"></i>
      </router-link>
      <router-link :to="{name:'Contacts'}">
        <i class="fa-solid fa-address-book"></i>
      </router-link>
      <router-link :to="{name:'Profile'}">
        <i class="fa-solid fa-user"></i>
      </router-link>
    </div>
  </footer>
</template>

<style scoped>

i{
  font-size: 2em;
  color: #636363;
}

a.router-link-active i{
  color: #0b0454;
}

</style>
