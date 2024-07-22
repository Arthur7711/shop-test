<script setup lang="ts">
import { RouterView, useRoute, useRouter, RouterLink } from 'vue-router'

const routes = [
  { name: 'Categories', path: '/categories' },
  { name: 'Products', path: '/products' }
]
const router = useRouter()

const makeReplace = () => {
  router.replace('/')
}

const useRoutes = (route: string) => {
  const { path, query } = useRoute()
  const id = query?.category_id
  return {
    active: path === route,
    to: route + (id ? '?category_id=' + id : '')
  }
}
</script>
<template>
  <section class="categories">
    <div class="actions">
      <nav>
        <RouterLink
          v-for="route in routes"
          class="categories_link"
          :data-selected-route="useRoutes(route.path).active"
          :to="useRoutes(route.path).to"
          :key="route.path"
        >
          {{ route.name }}
        </RouterLink>
      </nav>
      <button @click="makeReplace" class="remove_button">Remove filters</button>
    </div>
    <RouterView />
  </section>
</template>
<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    nav {
      display: flex;
      gap: 20px;
    }
  }

  &_link {
    color: black;
    text-decoration: none;
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.5s;
    box-sizing: border-box;
  }
  .remove_button {
    padding: 8px;
    border: none;
    border-radius: 6px;
    transition: all 0.4s;

    &:hover {
      background-color: rgb(28, 10, 116);
      color: #fff;
    }
  }
}

[data-selected-route='true'] {
  color: #fff;
  background-color: rgb(28, 10, 116);
}
</style>
