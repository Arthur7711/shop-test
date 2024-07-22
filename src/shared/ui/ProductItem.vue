<script setup lang="ts">
import { useRouter } from 'vue-router'
import { type IProduct } from '@/api/models/productsTypes'
import ButtonGroup from './ButtonGroup.vue'

defineProps<{ product: IProduct }>()
const emit = defineEmits<{
  (e: 'update'): void
}>()
const router = useRouter()
</script>
<template>
  <section class="product_container">
    <div class="product" @click="() => router.push(`/product/${product.id}`)">
      <img :src="product.imageUrl" alt="product" width="200px" height="200px" />
      <div class="product_info">
        <span class="product_info_name">{{ product.name }}</span>
        <span class="product_info_name">Price: {{ product.price }} ₽</span>
      </div>
    </div>
    <ButtonGroup @update="() => emit('update')" :id="product.id" />
  </section>
</template>

<style lang="scss" scoped>
.product_container {
  transition: all 0.5s;
  .product {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    background-size: cover;
    background-position: center;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid #fff;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      -webkit-box-shadow: 0 0 18px 4px rgba(145, 195, 235, 0.42);
      -moz-box-shadow: 0 0 18px 4px rgba(145, 195, 235, 0.42);
      box-shadow: 0 0 18px 4px rgba(145, 195, 235, 0.42);
    }
    &_info {
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(5px) sepia(20%);
      padding: 10px 4px;
      border-radius: 8px;
      background-color: rgba(145, 195, 235, 0.42);
      gap: 20px;
      width: 100%;
      &_name {
        text-align: left;
        color: black;
      }
    }
  }
}
</style>
