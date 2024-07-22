<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <section class="not_found">
    <div>
      <h1>Page Not Found</h1>
      <p class="">
        Please return back to <router-link to="/">Categories and Products</router-link> page and
        continue ;)
      </p>
    </div>
  </section>
</template>
<style scoped>
.not_found {
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 48px;
    text-align: center;
  }
  a {
    color: blue;
  }
}
</style>
