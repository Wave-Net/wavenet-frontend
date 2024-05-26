<template>
  <div ref="overflowStartCenter" class="overflow-start-center">
    <OrganizationChart :value="formattedData">
      <template #default="slotProps">
        <i :class="slotProps.node.icon"></i>
        <span>{{ slotProps.node.label }}</span>
      </template>
    </OrganizationChart>
  </div>
</template>

<script setup lang="ts">
import OrganizationChart from "primevue/organizationchart";
import { onMounted, ref, defineProps, computed } from "vue";

interface Device {
  index: number;
  is_active: boolean;
}

const props = defineProps<{
  deviceData: Device[];
}>();

const formattedData = computed(() => {
  return {
    icon: "pi pi-wifi",
    children: props.deviceData.map((device) => ({
      label: `${device.index}`,
      data: device,
    })),
  };
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
