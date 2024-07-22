<script setup lang="ts">
import { type ICategory } from '@/api/models/categoryTypes'

defineProps<{ category: ICategory; selected: boolean }>()
</script>
<template>
  <div class="category_item" :data-selected="selected">
    <img :src="category.imageUrl" alt="category" width="200px" height="200px" />
    <div class="category_item_info">
      <span class="category_item_name">{{ category.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category_item {
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
    padding: 10px 4px;
    gap: 20px;
    border-radius: 8px;
    backdrop-filter: blur(5px) sepia(20%);
    background-color: rgba(145, 195, 235, 0.42);
    width: 100%;
  }
}
</style>
