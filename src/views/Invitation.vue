<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import Layout from "@/layouts/general.vue";
import Heading1 from "@/components/base/Heading1.vue";
import {get, post} from "@/api";
import {register} from "register-service-worker";
import {acceptInvitation} from "@/api/endpoints";

const route = useRoute()

const invitation = ref(null)

const token = route.query.token

const registrationForm = ref({
  user_name: '',
  token: token,
  password: '',
  password_confirmation: ''
})

const register = () => {

  post(acceptInvitation, registrationForm.value)
      .then((res) => {
        console.log(res)
        alert('Registration successful')
      })
      .catch((err) => {
        console.error(err)
        alert(err.message)
      })
}


get('/invitations/' + token).then((res) => {
  invitation.value = res.data.invitation
}).catch((err) => {
  console.error(err)

  alert(err.message)
})


</script>

<template>
  <Layout>
    <div class="px-4 my-5">
      <Heading1 msg="Acception Invitation" class="text-center"/>

      <div class="container" v-if="invitation">
        <form action="" class="form text-left" @submit.prevent="register">
          <input type="hidden" :value="token" name="token">
          <div class="mb-3">
            <label for="user_name" class="form-label">Name</label>
            <input type="text" class="form-control" id="user_name" aria-describedby="userNameHelp"
                   placeholder="Enter your name" v-model="registrationForm.user_name"/>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                   placeholder="Enter your email" disabled  v-model="invitation.email"/>
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" aria-describedby="passwordHelp"
                   placeholder="Enter your password"  v-model="registrationForm.password"/>
          </div>

          <div class="mb-3">
            <label for="password_confirmation" class="form-label">Password Confirmation</label>
            <input type="password" class="form-control" id="password_confirmation"
                   aria-describedby="passwordConfirmationeHelp" placeholder="Enter your password again"
                   v-model="registrationForm.password_confirmation"/>
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
form label {
  text-align: left;
}
</style>