<template>
  <TheHeader />
  <main class="content">
    <div class="row">
      <div class="col-9">
        <Card>
          <template #title>Simple Card</template>
          <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
    </div>
    <div class="row">
      <div class="col-9">
        <Card>
          <template #title>Simple Card</template>
          <template #content>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
          </template>
        </Card>
      </div>
    </div>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { TheHeader, TheFooter } from "@/components";
import Card from "primevue/card";
</script>

<style scoped></style>
