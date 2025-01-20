<template>
  <div class="container">
    <form class="form" @submit.prevent="register">
    <div class="card bg-transparent border-0">
      <div class="card-header bg-transparent border-0"><h5 class="card-title text-center">Sign Up</h5></div>

      <div class="card-body">
        <div class="form-group mb-3">
          <input type="text" class="form-control" id="text" v-model="form.company_name" placeholder="ACME Co." required>
          <small>Your custom login page: <em>{{custom_login_page}}</em></small>
        </div>

        <div class="form-group mb-3">
          <input type="text" class="form-control" id="user_name" v-model="form.user_name" placeholder="John Doe" required>
        </div>

        <div class="form-group mb-3">
          <input type="email" class="form-control" id="email" v-model="form.email" placeholder="john.doe@acme.com" required>
        </div>

        <div class="form-group mb-3">
          <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Password" required>
        </div>

        <div class="form-group mb-3">
          <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation" placeholder="Confirm Password" required>
        </div>
        </div>

      <div class="card-footer bg-transparent border-0 d-flex justify-content-end">
        <button type="submit" class="btn btn-success px-5">Sign Up</button>
      </div>
      </div>

    </form>
  </div>
</template>

<script lang="ts" setup>

import {ref, computed} from 'vue';
import {registration} from "@/api/endpoints";
import {post} from "@/api";
import {useRouter} from "vue-router";
import slugify from "slugify";

const router = useRouter()

const form = ref({
  company_name: "",
  user_name: "",
  email: '',
  password: '',
  password_confirmation: ''
})

const slugifyConfig = {
  replacement: '-',
  remove: /[*+~.()'"!:@]/g,
  lower: true
}

const custom_login_page = computed(()=>{
  return form.value.company_name ? slugify(form.value.company_name,slugifyConfig) + ".ai-crm.yoov.dev/login " : ""
})

const register = (e: Event) => {
  post(registration, form.value,{
    headers: {
      'Content-Type': 'application/json'
    },
  })
      .then(res => {
        alert('Registration successful. Please login to continue.')
        router.push({name: 'Login'})
      })
      .catch(err => {
        alert(err.response.data.error)
      })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
