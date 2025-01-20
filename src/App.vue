<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>


<style>
#app{
  position: relative;
  height: 100vh;
  max-height: 100vh;
  overflow-y:scroll;
}


</style>
