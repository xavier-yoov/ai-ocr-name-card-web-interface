<script setup lang="ts">

import {defineProps} from 'vue';

const props = defineProps({
  contact: Object
})

</script>

<template>
<div class="card contact-item">

  <div class="card-body">
    <router-link :to="{name:'Contact Detail', params:{id: contact.id}}" class="contact-title stretched-link">
      <h5 class="card-title mb-0">
        {{ contact.first_name }} {{ contact.last_name }}
      </h5>
      <p class="card-text"><small>{{contact.company_name}}</small></p>
    </router-link>
    <p class="card-text">Email: <a :href="'mailto:'+contact.email">{{ contact.email }}</a></p>
    <p class="card-text">Tel: <a :href="'tel:'+contact.mobile_phone">{{contact.mobile_phone}}</a> </p>
  </div>
</div>
</template>

<style scoped>

a.contact-title{
  color: inherit;
  text-decoration: none;
}

.card-title{
  font-weight: 600;
}

.card-text{
  margin-bottom: 5px;
}

</style>