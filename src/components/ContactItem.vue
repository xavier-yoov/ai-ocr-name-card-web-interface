<script setup lang="ts">

import {defineProps} from 'vue';

const props = defineProps({
  contact: Object
})

</script>

<template>
<div class="card contact-item">
  <div class="card-body pb-1">
    <router-link :to="{name:'Contact Detail', params:{id: contact.id}}" class="contact-title">
      <h5 class="card-title">
          {{ contact.first_name }} {{ contact.last_name }}
      </h5>
      <p class="card-text"><small>{{contact.company_name}}</small></p>
    </router-link>
  </div>
  <div class="card-footer bg-white">
    <p class="card-text">
      <button class="btn">Email: <a :href="'mailto:'+contact.email"> {{ contact.email }}</a></button>
      <button class="btn">Mobile: <a :href="'tel:'+contact.mobile_phone_number">{{contact.mobile_phone_number}}</a> </button>
    </p>
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