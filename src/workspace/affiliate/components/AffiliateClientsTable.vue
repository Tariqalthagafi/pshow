<template>
  <div class="clients-box">
    <h3>العملاء المستقطبون</h3>

    <table v-if="clients.length">
      <thead>
        <tr>
          <th>رقم العميل</th>
          <th>البريد</th>
          <th>الحالة</th>
          <th>تاريخ التسجيل</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.id }}</td>
          <td>{{ client.email }}</td>
          <td>
            <span :class="['status', client.status]">
              {{ translateStatus(client.status) }}
            </span>
          </td>
          <td>{{ client.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="empty">لا يوجد عملاء حتى الآن.</p>
  </div>
</template>

<script setup lang="ts">
import { useAffiliate } from "../composables/useAffiliate"

const { clients, translateStatus } = useAffiliate()
</script>
