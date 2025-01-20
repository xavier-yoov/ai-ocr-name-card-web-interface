<template>
  <div class="container">
    <form class="form" @submit.prevent="login">
    <div class="card bg-transparent border-0">
      <div class="card-header bg-transparent border-0"><h5 class="card-title text-center">Login</h5></div>
      <div class="card-body">
        <input type="hidden" id="company_id" v-model="form.company_id" required>
        <div class="form-group mb-3">
          <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Enter email" required>
        </div>

        <div class="form-group mb-3">
          <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Password" required>
        </div>
        </div>
      <div class="card-footer bg-transparent border-0 d-flex justify-content-end">
        <button type="submit" class="btn btn-success px-5"  :disabled="isLoading">{{isLoading?"Loading...":"Login"}}</button>
      </div>
      </div>
      <hr>
      <p>If you don't have account, please <router-link :to="{name:'register'}">Sing up !</router-link></p>

    </form>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue';
import {auth} from "@/api/endpoints";
import {post} from "@/api";
import {useRouter} from "vue-router";
import AppNavbar from "@/components/Navbar.vue";

const router = useRouter()

const isLoading = ref(false)

const form = ref({
  company_id: 1,
  email: '',
  password: ''
})

const login = (e: Event) => {
  isLoading.value = true
  post(auth.login, form.value,{
    headers: {
      'Content-Type': 'application/json'
    },
  })
      .then(res => {
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        router.push({name: 'Home'})
      })
      .catch(err => {
        isLoading.value = false
        alert(err.response.data.error)
      })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
