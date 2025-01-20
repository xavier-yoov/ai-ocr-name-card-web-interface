<template>
  <App>
    <div class="profile container" v-if="user">
      <section>
        <Heading1 msg="My Profile"></Heading1>
        <div class="container px-3">
          <p>Name: {{ user?.name }}</p>
          <p>Team: {{ user?.team.name }}</p>
          <p>Email: {{ user?.email }}</p>
          <p>Company: {{ user?.team.name }}</p>
          <button class="btn btn-info mb-3" @click="logout">Logout</button>
          <br>
        </div>

      </section>
      <section v-if="user.role_name==='Administrator'" class="mb-3">
        <Heading1 msg="Invite User"></Heading1>
        <div class="container">
          <form @submit.prevent="inviteUser">
            <div class="form-group">
              <label for="user_name">User Name</label>
              <input type="text" class="form-control" id="user_name" aria-describedby="userNameHelp" required v-model="invitationForm.user_name">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required v-model="invitationForm.email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div class="form-group">
              <label for="role">Role</label>
              <select class="form-control" id="role" v-model="invitationForm.role_id" required>
                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
              </select>
            </div>

            <div class="form-group mt-3">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>

      </section>
      <section v-if="user.role_name==='Administrator'">
        <Heading1 msg="Invitations"></Heading1>
        <div class="container">
          <InvitationTable :invitations="invitations"></InvitationTable>
        </div>
      </section>
    </div>
    <div v-else><button class="btn btn-info mb-3" @click="logout">Logout</button></div>
  </App>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

import Heading1 from "@/components/base/Heading1.vue";
import {getUserFromJwt, removeCredentials} from "@/helpers/auth";
import App from "@/layouts/app.vue";
import {roles as rolesEndpoint, invitations as invitationsEndpoint, invite} from "@/api/endpoints";
import {get, post} from "@/api";
import InvitationTable from "@/components/InvitationTable.vue";

type User = {
  id: string,
  name?: string,
  email?: string,
  role:string,
  team: {
    id: string,
    name: string
  }
}

const router = useRouter()

const user = ref<User | null>(null)
const roles = ref<{ id: number, name: string }[]>([])
const invitations = ref<{ id: number, user_name: string, created_at: Date, accepted_at: Date }[]>([])

const invitationForm = ref({
  user_name: '',
  email: '',
  role_id: null
})

const fetchUser = () => {
  user.value = getUserFromJwt()
}

const logout = () => {
  removeCredentials()
  router.push({name: 'login'})
}

const deferredPrompt = ref<any | null>(null)

const getRoles = () => {
  get(rolesEndpoint)
      .then((res) => {
        roles.value = res.data.roles
        console.log(res)
      })
}

const getInvitations = () => {
  get(invitationsEndpoint)
      .then((res) => {
        invitations.value = res.data.invitations
        console.log(res)
      })
}

const inviteUser = ()=>{
  post(invite, invitationForm.value)
      .then((res)=>{
        console.log(res)
        getInvitations()
      })
  console.log(invitationForm.value)
}

fetchUser()

getRoles()

getInvitations()

const showAddToHomeScreen = () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    deferredPrompt.value.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt.value = null;
    });
  }
}


onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });
})


</script>
