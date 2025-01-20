<template>
  <App>
    <div class="contacts-view container">
      <Heading1 msg="Contacts" class="d-flex align-items-center justify-content-between">
        <button @click.prevent="addContact" class="btn btn-success btn-sm"><i class="fa-solid fa-plus"></i></button>
      </Heading1>
      <SearchBar class="mb-3" v-on:search="searchContact"/>
      <div class="contacts-container">
        <h4 class="text-center" v-if="isLoading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </h4>
        <ContactItem class="mb-3" v-else v-for="contact in searchedContacts" :key="contact.id" :contact="contact"/>
      </div>
    </div>
  </App>
</template>

<script lang="ts" setup>
import {ref, computed} from "vue";
import {useRouter} from "vue-router";
import Heading1 from "@/components/base/Heading1.vue";
import ContactItem from "@/components/ContactItem.vue";
import SearchBar from "@/components/base/SearchBar.vue";
import {get} from "@/api";
import {contacts} from "@/api/endpoints";
import App from "@/layouts/app.vue";
import {NameCard} from "@/types/nameCard";


const router = useRouter()
const isLoading = ref(true)
const nameCards = ref<NameCard[]>([]);

const searchKeyword = ref('')

const searchedContacts = computed(() => {

  if (searchKeyword.value.length === 0) {
    return nameCards.value
  }

  return nameCards.value.filter(contact => {
    return contact.first_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        contact.last_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        contact.company_name?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        contact.mobile_phone_number?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        contact.office_phone_number?.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchKeyword.value.toLowerCase())
  })
})

const addContact = () => {
  router.push({name: 'Add Contact'})
}

const searchContact = (keyword: string) => {
  searchKeyword.value = keyword
}

get(contacts, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then(res => nameCards.value = res.data.nameCards)
    .finally(() => isLoading.value = false)
</script>
