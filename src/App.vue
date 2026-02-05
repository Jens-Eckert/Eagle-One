<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import PlaneViewPort from "./components/DonutTesting.vue";

</script>

<template>
  <div class="h-[100vh]">
    <TresCanvas clear-color="#82DBC5" tabindex="0">
      <PlaneViewPort />
    </TresCanvas>
  </div>
</template>

<style scoped></style>
