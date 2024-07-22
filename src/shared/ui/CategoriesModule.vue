<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategories } from '@/api/business/category'
import { type ICategoryItems } from '@/api/models/categoryTypes'
import useLoading from '@/features/useLoading'
import CategoryItem from './CategoryItem.vue'

const route = useRoute()
const router = useRouter()

const categories = ref<ICategoryItems | null>(null)
const { isLoading, setLoading } = useLoading
const id = ref()

onMounted(() => {
  id.value = route.query?.category_id ? route.query?.category_id : undefined
  getCategoriesData()
})

const getCategoriesData = async () => {
  try {
    setLoading(true)
    const data = await getCategories(id.value)
    categories.value = {
      ...data,
      items: data.items
    }
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

const updateQuery = async (newId?: string) => {
  id.value = newId
  if (id.value) {
    router.replace({ query: { category_id: String(id.value) } })
  }
}

watch(
  () => route.query,
  async () => {
    id.value = route.query?.category_id ? route.query?.category_id : undefined
    getCategoriesData()
  }
)
</script>
<template>
  <section class="category">
    <h2>Categories</h2>
    <div v-if="categories?.items?.length && !isLoading" class="category_container">
      <CategoryItem
        @click="() => updateQuery(String(category.id))"
        v-for="category in categories?.items"
        :selected="id == category.id"
        :category="category"
        :key="category.id"
      />
    </div>
    <span v-if="isLoading">Loading...</span>
  </section>
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  &_container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    justify-items: center;
    flex-wrap: wrap;
    padding: 0 40px;
    gap: 20px;
    width: 100vw;
  }
}
</style>
