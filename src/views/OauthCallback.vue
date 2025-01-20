<template>
  <div>Loading...</div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';

const router = useRoute()
const code = router.query.code
</script>