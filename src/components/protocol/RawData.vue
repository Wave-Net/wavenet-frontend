<template>
  <div class="raw-data">
    <div v-for="(field, key) in fields" :key="key" class="accordion-item">
      <div
        class="accordion-header"
        :class="{ active: openPanels.includes(key) }"
        @click="toggle(key)"
      >
        <i
          :class="
            openPanels.includes(key) ? 'pi pi-angle-down' : 'pi pi-angle-right'
          "
        ></i>
        {{ key }}
      </div>
      <div v-if="openPanels.includes(key)" class="accordion-content">
        <div><strong>Value:</strong> {{ field.value }}</div>
        <div><strong>Raw Bytes:</strong> {{ field.raw_bytes }}</div>
        <div><strong>ASCII:</strong> {{ field.ascii }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  fields: {
    type: Object as () => Record<
      string,
      { value: string; raw_bytes: string; ascii: string; field_length: number }
    >,
    required: true,
  },
});

console.log(props);

const openPanels = ref<string[]>([]);

const toggle = (key: string) => {
  if (openPanels.value.includes(key)) {
    openPanels.value = openPanels.value.filter((panel) => panel !== key);
  } else {
    openPanels.value.push(key);
  }
};
</script>

<style scoped>
.raw-data {
  border-radius: 0;
  padding: 0px 3px;
}
.accordion-item {
  border-radius: 0;
  border: 0px;
}
.accordion-header {
  background: transparent;
  cursor: pointer;
  padding: 1px 1px 1px 3px;
  text-align: left;
  color: #2c3e50;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  border: 0px;
}
.accordion-header:hover {
  background-color: #f0f0f0; /* Hover background color */
}
.accordion-header.active {
  background-color: #e0e0e0; /* Active (clicked) background color */
}
.accordion-header i {
  margin-right: 8px;
}
.accordion-content {
  padding: 5px 10px 5px 25px;
  background: transparent;
  border: 0px;
  color: #2c3e50;
}
</style>
