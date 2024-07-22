<script setup lang="ts">
import { useRouter } from 'vue-router'
import useCartData from '@/features/useCartData'
import CartIcon from '../../app/assets/cart.svg'

const {
  options: { routes }
} = useRouter()

const { getTotalItemsCount } = useCartData
</script>
<template>
  <header class="header">
    <nav class="header_routes">
      <RouterLink v-for="route in routes" :to="route.path" :key="route.name">{{
        route.name
      }}</RouterLink>
      <RouterLink class="header_cart" :data-counter="getTotalItemsCount()" to="/cart">
        <img class="header_cart_image" :src="CartIcon" alt="cart" />
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: rgba(255, 255, 255, 0.725);
  border-radius: 0px 0px 6px 6px;
  border: none;
  width: 100%;
  height: 60px;
  border-bottom: 1px rgba(193, 191, 191, 0.221) solid;
  position: fixed;
  z-index: 10;
  backdrop-filter: blur(3px);
  box-shadow: inset 4px 8px 10px 0px rgba(193, 191, 191, 0.221);
  &_routes {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    padding: 0 50px;
    align-items: center;
    height: 100%;
  }
  &_cart {
    position: relative;
    color: black;

    &::after {
      content: attr(data-counter);
      background-color: rgb(255, 255, 255);
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 60%;
      bottom: 0;
      width: 20px;
      border: 0.5px gray solid;
      height: 20px;
      border-radius: 10px;
    }
    &_image {
      width: 30px;
      border: none;
      border-radius: 50%;
    }
  }
}

[data-selected='true'] {
  text-shadow: 0px 2px 6px rgb(14, 81, 215);
}
</style>
