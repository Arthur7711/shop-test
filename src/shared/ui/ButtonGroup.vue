<script setup lang="ts">
import useCartData from '@/features/useCartData'
import AddCartIcon from '../../app/assets/cart-add.svg'
import AddedCartIcon from '../../app/assets/cart-added.svg'

const props = defineProps<{ id: number }>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const { items, setItem, decrement } = useCartData

const addItem = () => {
  setItem(props.id)
  emit('update')
}
const removeItem = (id: number) => {
  decrement(id)
  emit('update')
}
const itemsCount = (id: number) => {
  return items.value.get(id)
}
</script>
<template>
  <section class="product_section">
    <button v-if="itemsCount(id)" @click="() => removeItem(id)">-</button>
    <button @click="addItem">
      <img class="count_image" v-if="!itemsCount(id)" :src="AddCartIcon" alt="add_cart" />
      <img
        class="count_image"
        v-else-if="itemsCount(id)"
        :src="AddedCartIcon"
        alt="add_cart"
      />
      <span>{{ itemsCount(id) }}</span>
    </button>
    <button v-if="itemsCount(id)" @click="addItem">+</button>
  </section>
</template>
<style lang="scss" scoped>
.count_image {
  width: 30px;
}

.product_section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  button {
    background: none;
    border: none;
    font-size: 28px;
  }
}
</style>