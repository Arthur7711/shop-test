<script setup lang="ts">
defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()
</script>

<template>
  <div @click="() => emit('update:isOpen', !isOpen)" v-if="isOpen" class="modal">
    <div class="modal_body">
      <slot name="body"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(94, 94, 94, 0.284);
  position: fixed;
  display: flex;
  z-index: 100;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  &_body {
    width: 300px;
    height: 300px;
    background-color: white;
    border-radius: 12px;
  }
}
</style>
