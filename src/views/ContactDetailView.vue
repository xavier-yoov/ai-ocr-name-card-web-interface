<template>
  <App>
  <div class="contacts-view container">
    <div class="d-flex">
      <Heading1 :msg="fullName|| 'Contact Detail'"></Heading1>
      <div class="ms-auto">
       <button class="btn btn-info" @click="editContact">
         <i class="fa-solid fa-pen-to-square yoov-primary"></i>
       </button>
      </div>
    </div>

    <div class="name-card-container px-3">
      <p id="company-name">{{nameCard?.company_name}}</p>
      <p id="job-title">{{nameCard?.job_title}}</p>
      <p>Mobile Number:
        <a :href="`tel:${nameCard?.mobile_phone_number}`">{{nameCard?.mobile_phone_number}}</a>
        <a class="mx-3"  target="_blank" :href="`https://wa.me/${nameCard?.mobile_phone_number}`"><i class="fa-brands fa-whatsapp"></i></a>
      </p>
      <p>Office Number: <a :href="`tel:${nameCard?.office_phone_number}`">{{nameCard?.office_phone_number}}</a></p>
      <p>Email: <a :href="`mailto:${nameCard?.email}`">{{nameCard?.email}}</a></p>
      <address class="office-address">
        Office Address:
        <a target="_blank" :href="`http://maps.google.com/?q=${officeAddress}`">
          {{nameCard?.office_address_1}} <br>
          {{nameCard?.office_address_2}} <br>
          {{nameCard?.office_address_3}}
        </a>
      </address>
      <p class="notes mb-3">
        <span>Notes</span>
        <br>
        {{nameCard?.notes}}
      </p>
      <div class="d-grid gap-2">
        <button class="btn  bg-yoov-primary text-light" type="button" @click="downloadVcf">
          <i class="fa-solid fa-download px-2"></i>  Download Name Card
        </button>
      </div>
    </div>

    <div class="modal fade" ref="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true" v-if="nameCard">
      <div class="modal-dialog">

        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Contact</h5>
            <button ref="modalCloseButton" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <EditNameCardForm :name-card="nameCard"
                              :on-cancel="closeModal"
                              :on-submit="updateContact" />
          </div>


        </div>

      </div>
    </div>
  </div>
  </App>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {useRoute} from "vue-router";
import {Modal} from "bootstrap";

import Heading1 from "@/components/base/Heading1.vue";
import EditNameCardForm from "@/components/form/EditNameCardForm.vue";
import {get} from "@/api";
import {contact, vcf} from "@/api/endpoints";
import App from "@/layouts/app.vue";
import {NameCard} from "@/types/nameCard";

const route = useRoute();
const userId = ref(route.params.id as unknown as number);

const editModal = ref<HTMLElement|null>(null);
const nameCard = ref<NameCard|null>(null);

const fullName = computed(()=>{
  if(nameCard.value){
    return `${nameCard.value.first_name} ${nameCard.value.last_name}`
  }
  return ''
})

const officeAddress = computed(()=>{
  if(nameCard.value){
    return [
      nameCard.value.office_address_1,
      nameCard.value.office_address_2,
      nameCard.value.office_address_3
    ].join(' ')
  }
  return ''
})

const modalCloseButton = ref<HTMLButtonElement|null>(null)

const editContact = ()=>{
  const modal = new Modal(editModal.value!)
  modal.show()
}

const closeModal = ()=>modalCloseButton.value!.click()

const updateContact = (data:NameCard)=>{
  console.log("update contact",nameCard.value)
  closeModal()
}

const downloadVcf = ()=>{
  get(vcf(userId.value),{
    responseType: 'blob',
  })
}

get(contact(userId.value),{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then(res=>nameCard.value = res.data.nameCard)
</script>
