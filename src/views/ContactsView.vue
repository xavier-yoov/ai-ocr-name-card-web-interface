<template>
  <App>
  <div class="contacts-view container">
    <Heading1 msg="Contacts"></Heading1>
    <SearchBar class="mb-3" v-on:search="searchContact"/>
    <div class="contacts-container">
      <ContactItem class="mb-3" v-for="contact in searchedContacts" :key="contact.id" :contact="contact" :debounceTimer="100"/>
    </div>

  </div>

  </App>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import Heading1 from "@/components/base/Heading1.vue";
import ContactItem from "@/components/ContactItem.vue";
import SearchBar from "@/components/base/SearchBar.vue";
import {get} from "@/api";
import {contacts} from "@/api/endpoints";
import App from "@/layouts/app.vue";

const nameCards = ref<{
  id:string,
  first_name?:string,
  last_name?:string,
  company_name?:string,
  mobile_phone?:string,
  email?:string
}[]>([]);

const searchKeyword = ref('')

const searchedContacts = computed(()=>{

  if(searchKeyword.value.length === 0){
    return nameCards.value
  }

  return nameCards.value.filter(contact => {
    return contact.first_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    contact.last_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    contact.company_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    contact.mobile_phone?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchKeyword.value.toLowerCase())
  })
})

const searchContact = (keyword: string) => {
  searchKeyword.value = keyword
}

get(contacts,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then(res=>nameCards.value = res.data.nameCards)
</script>
