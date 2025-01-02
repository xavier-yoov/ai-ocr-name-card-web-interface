<template>
  <App>
  <div class="profile container">
    <Heading1 msg="My Profile"></Heading1>
    <div class="container px-3">
      <p>Name: {{user?.name}}</p>
      <p>Email: {{user?.email}}</p>
      <button class="btn btn-info" @click="logout">Logout</button>
    </div>
  </div>
  </App>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

import Heading1 from "@/components/base/Heading1.vue";
import {removeCredentials} from "@/helpers/auth";
import App from "@/layouts/app.vue";

type User = {
  id:string,
  name?:string,
  email?:string
}

const router = useRouter()

const user = ref<User|null>(null)

const fetchUser = ()=>{
  user.value = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
}

const logout = ()=>{
  removeCredentials()
  router.push({name:'login'})
}

fetchUser()


</script>
