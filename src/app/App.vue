<template>
  <HeaderComponent />
  <div class="layout">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "@/shared/ui/Header.vue";
</script>

<style lang="scss" scoped>
.layout {
  padding: 100px 0;
  max-width: 100vw;
  overflow-x: hidden;
}
</style>
