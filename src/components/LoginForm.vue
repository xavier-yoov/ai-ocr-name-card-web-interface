<template>
  <div class="container d-flex justify-content-center">
    <div class="card" style="width: 500px">
      <div class="card-body px-4">
        <center style="margin-top: 20px; margin-bottom: 40px;">
          <h3><strong>Login</strong></h3>
        </center>
        <form class="form" @submit.prevent="login">
          <input type="email" class="form-control mb-3 mt-4" id="email" v-model="form.email" placeholder="Email" required>
          <input type="password" class="form-control mt-4 mb-2" id="password" v-model="form.password" placeholder="Password" required>
          <button type="submit" style="border-radius: 9999px;" class="btn btn-success px-5 w-100 mt-4 mb-4 btn-lg"  :disabled="isLoading">{{isLoading?"Loading...":"Login"}}</button>
        </form>
        <div style="color: gray" class="my-4 d-flex align-items-center flex-column">
          <div style="font-size: 14px;">Or Sign Up With YOOV</div>
          <button @click="loginYoov" type="button" style="border-radius: 9999px;" class="px-5 mt-3 btn-outline-success btn"  :disabled="isLoading">YOOV</button>
        </div>
        <p style="margin-top: 100px;">
          <center>If you don't have account, please <router-link :to="{name:'register'}">Sign up!</router-link></center>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue';
import {auth} from "@/api/endpoints";
import {post} from "@/api";
import {useRouter} from "vue-router";

const router = useRouter()

const isLoading = ref(false)

const form = ref({
  company_id: 1,
  email: '',
  password: ''
})

const loginYoov = () => window.location.href = process.env.VUE_APP_PASSPORT_URL

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
