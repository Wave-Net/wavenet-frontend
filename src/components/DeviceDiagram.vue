<template>
  <div ref="overflowStartCenter" class="overflow-start-center">
    <OrganizationChart :value="data">
      <template #default="slotProps">
        <div class="node-content">
          <i :class="slotProps.node.icon"></i>
          <span>{{ slotProps.node.label }}</span>
        </div>
      </template>
    </OrganizationChart>
  </div>
</template>

<script setup lang="ts">
import OrganizationChart from "primevue/organizationchart";
import { onMounted, ref } from "vue";

const data = ref({
  icon: "pi pi-wifi",
  children: [
    {
      label: "1",
    },
    {
      label: "2",
    },
    {
      label: "3",
    },
    {
      label: "4",
    },
    {
      label: "5",
    },
    {
      label: "6",
    },
    {
      label: "7",
    },
    {
      label: "8",
    },
    {
      label: "9",
    },
    {
      label: "10",
    },
    {
      label: "11",
    },
    {
      label: "12",
    },
  ],
});

const overflowStartCenter = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (overflowStartCenter.value) {
    const containerWidth = overflowStartCenter.value.offsetWidth;
    const scrollWidth = overflowStartCenter.value.scrollWidth;
    const centerPosition = (scrollWidth - containerWidth) / 2;
    overflowStartCenter.value.scrollLeft = centerPosition;
  }
});
</script>

<style scoped>
.overflow-start-center {
  overflow-x: auto;
  white-space: nowrap;
}
</style>
