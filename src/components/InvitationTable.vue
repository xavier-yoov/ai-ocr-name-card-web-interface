<script setup lang="ts">
import {computed, defineProps} from 'vue'

interface Props {
  invitations: {
    id: number
    user_name: string
    email: string
    accepted_at: Date
    role: string
    created_at: Date
  }[]
}

const props = defineProps<Props>()

const _invitations = computed(() => props.invitations?.map(item => {
  return {
    id: item.id,
    user_name: item.user_name,
    email: item.email,
    created_at: new Date(item.created_at).toLocaleString(),
    // Assuming that the invitation expires after 24 hours
    status: item.accepted_at ? 'Accepted' : (new Date(item.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000) ? 'Pending' : 'Expired')
  }
}) ?? [])





</script>

<template>
  <table class="table invitation-table">
    <thead>
    <tr>
      <th>Email</th>
      <th>Status</th>
      <th>Created At</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="invitation in _invitations" :key="invitation.id">
      <td>{{ invitation.email }}</td>
      <td>{{ invitation.status }}</td>
      <td>{{ invitation.created_at }}</td>
    </tr>
    </tbody>
  </table>
</template>
