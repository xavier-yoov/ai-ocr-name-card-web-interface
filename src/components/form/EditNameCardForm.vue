<script setup lang="ts">
import { ref, defineProps } from "vue";

import {NameCard} from "@/types/nameCard";

interface Props  {
  nameCard:NameCard,
  onCancel:Function,
  onSubmit:Function
}

const props = defineProps<Props>()
const nameCard = ref<NameCard>({
  id: '',
  first_name: '',
  last_name: '',
  company_name: '',
  job_title: '',
  mobile_phone_number: '',
  office_phone_number: '',
  email: '',
  office_address_1: '',
  office_address_2: '',
  office_address_3: '',
  notes: ''
})

const clonePropsToLocal = ()=>{
  nameCard.value = {...props.nameCard}
}

const cancel = ()=>props.onCancel?.()

const updateContact = ()=>props.onSubmit?.(nameCard.value)

clonePropsToLocal()
</script>

<template>
  <form @submit.prevent="updateContact">
    <div class="mb-3">
      <label for="first_name" class="form-label">First Name</label>
      <input type="text" class="form-control" id="first_name" v-model="nameCard.first_name">
    </div>
    <div class="mb-3">
      <label for="last_name" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="last_name" v-model="nameCard.last_name">
    </div>
    <div class="mb-3">
      <label for="company_name" class="form-label
                ">Company Name</label>
      <input type="text" class="form-control" id="company_name" v-model="nameCard.company_name">
    </div>
    <div class="mb-3">
      <label for="mobile_phone" class="form-label">Mobile Phone</label>
      <input type="text" class="form-control" id="mobile_phone" v-model="nameCard.mobile_phone">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" v-model="nameCard.email">
    </div>
    <div class="mb-3">
      <label for="office_address_1" class="form-label
                ">Office Address 1</label>
      <input type="text" class="form-control" id="office_address_1" v-model="nameCard.office_address_1">
    </div>
    <div class="mb-3">
      <label for="office_address_2" class="form-label
                ">Office Address 2</label>
      <input type="text" class="form-control" id="office_address_2" v-model="nameCard.office_address_2">
    </div>
    <div class="mb-3">
      <label for="office_address_3" class="form-label
                ">Office Address 3</label>
      <input type="text" class="form-control" id="office_address_3" v-model="nameCard.office_address_3">
    </div>
    <div class="mb-3">
      <label for="notes" class="form-label">Notes</label>
      <textarea class="form-control" id="notes" v-model="nameCard.notes"></textarea>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn btn-info" type="button" @click="cancel">Cancel</button>
      <button class="btn btn-info" type="submit">Update</button>
    </div>
  </form>

</template>