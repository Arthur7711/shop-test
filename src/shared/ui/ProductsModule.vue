<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProducts } from '@/api/business/products'
import { type IProducts } from '@/api/models/productsTypes'
import useLoading from '@/features/useLoading'
import ProductItem from './ProductItem.vue'

const products = ref<IProducts | null>(null)
const { isLoading, setLoading } = useLoading
const route = useRoute()
const id = ref(route?.query?.category_id ? route?.query?.category_id : undefined)

const getProductsData = async () => {
  try {
    setLoading(true)
    products.value = await getProducts(id.value as string)
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
}

onMounted(() => {
  getProductsData()
})

watch(
  () => route.query,
  async () => {
    try {
      const id = route.query?.category_id ? route.query?.category_id : undefined
      products.value = await getProducts(id as string)
    } catch (error) {
      console.log(error)
    }
  }
)
</script>

<template>
  <section class="products_container">
    <h2>Products</h2>
    <div v-if="products?.items?.length && !isLoading" class="categories">
      <ProductItem v-for="product in products?.items" :product="product" :key="product.id" />
    </div>
    <span v-else-if="isLoading">Loading...</span>
  </section>
</template>

<style lang="scss" scoped>
.products_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  .categories {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    flex-wrap: wrap;
    padding: 0 40px;
    gap: 20px;
    width: 100vw;
  }
}
</style>
