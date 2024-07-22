<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getProducts } from '@/api/business/products'
import { type IProducts } from '@/api/models/productsTypes'
import ProductItem from '@/shared/ui/ProductItem.vue'
import Modal from '@/shared/ui/Modal.vue'
import useCartData from '@/features/useCartData'
import useLoading from '@/features/useLoading'

const { getItemIds, removeItem, items, clearCart } = useCartData
const { isLoading, setLoading } = useLoading

const isOpenModal = ref(false)
const amount = ref(0)
const products = ref<IProducts | null>(null)

const updateAmount = () => {
  amount.value = 0
  products.value?.items?.forEach((el) => {
    const count = items.value.get(el.id)
    if (count) {
      amount.value += count * el.price
    }
  })
}
const getProductsInfo = async () => {
  try {
    setLoading(true)
    const productsIds = getItemIds()
    if (productsIds?.length) {
      products.value = await getProducts(undefined, productsIds)
      updateAmount()
    } else products.value = null
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
}
const deleteItem = (id: number) => {
  removeItem(id)
  getProductsInfo()
}

onMounted(() => {
  getProductsInfo()
});
watch(
  () => items.value.size,
  () => getProductsInfo()
);
watch(
  () => isOpenModal.value,
  () => {
    if (isOpenModal.value)
      setTimeout(() => {
        isOpenModal.value = false
        clearCart()
      }, 2000)
  }
);
</script>

<template>
  <section v-if="products?.items?.length && !isLoading" class="shopping_cart">
    <h2>Your products:</h2>
    <div class="mapper">
      <div v-for="product in products?.items" :key="product.id">
        <ProductItem @update="updateAmount" :product="product" />
        <button class="delete" @click="() => deleteItem(product.id)">DELETE</button>
      </div>
    </div>
    <h4>Amount: {{ amount }}₽</h4>
    <button class="order" @click="isOpenModal = !isOpenModal">Order</button>
  </section>
  <section v-else-if="isLoading" class="cart_products_section">
    <h1>Loading...</h1>
  </section>
  <section v-else-if="!products?.items?.length && !isLoading" class="cart_products_section">
    <h1>Cart is empty</h1>
  </section>
  <Modal v-model:is-open="isOpenModal">
    <template #body>
      <div class="modal_body">Congrats! You order on amount {{ amount }}₽ created!</div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.shopping_cart {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  .mapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 40px;
    width: 80vw;
    .delete {
      color: red;
      border: none;
      border-radius: 4px;
      margin-top: 20px;
      background: rgb(239, 186, 186);
      padding: 4px;
      transition: all ease-in-out;
      transition-duration: 0.3s;
      &:hover {
        color: #fff;
        background: red;
      }
    }
  }
  .order {
    background-color: rgba(27, 163, 93, 0.812);
    padding: 8px;
    border-radius: 6px;
    border: none;
    width: 200px;
    margin-top: 20px;
  }
}

.modal_body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
