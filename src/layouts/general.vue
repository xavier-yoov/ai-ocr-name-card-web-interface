<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
</script>

<template>
  <div class="d-flex flex-column h-100">
    <Navbar/>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>