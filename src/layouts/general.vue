<script setup lang="ts">

import NavbarLogin from "@/components/NavbarLogin.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
</script>

<template>
  <div class="d-flex flex-column h-100">
    <NavbarLogin/>
    <slot></slot>
  </div>
</template>