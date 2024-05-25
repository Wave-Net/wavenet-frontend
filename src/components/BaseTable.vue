<template>
  <div class="overflow-x-auto">
    <div v-if="title" class="mb-4 font-bold text-lg">{{ title }}</div>
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-gray-200">
          <th
            v-for="header in columns"
            :key="header"
            class="px-4 py-2 font-medium text-gray-900"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          class="hover:bg-gray-100"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="px-4 py-2 border"
          >
            {{ cell }}
          </td>
          <td class="px-4 py-2 border">
            <button
              class="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled
            >
              Start
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  columns: {
    type: Array as PropType<string[]>,
    required: true,
  },
  tableData: {
    type: Array as PropType<any[][]>,
    required: true,
  },
});
</script>
