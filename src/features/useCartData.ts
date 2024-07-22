import { ref } from 'vue'

type CartItem = [number, number]

const useCartData = (initialItems: CartItem[] = []) => {
  const items = ref(new Map<number, number>())

  const addItem = (item?: CartItem) => {
    if (!item) return
    const [itemId, quantity] = item
    const currentQuantity = items.value.get(itemId) || 0
    items.value.set(itemId, currentQuantity + quantity)
  }

  initialItems.forEach(addItem)

  const saveToStorage = () => {
    const serializedItems = JSON.stringify(Array.from(items.value.entries()))
    localStorage.setItem('cart_items', serializedItems)
  }

  const setItem = (itemId: number, quantity: number = 1) => {
    addItem([itemId, quantity])
    saveToStorage()
  }

  const decrement = (itemId: number) => {
    const currentQuantity = items.value.get(itemId)
    if (!currentQuantity) return
    if (currentQuantity <= 1) {
      removeItem(itemId)
    } else {
      items.value.set(itemId, currentQuantity - 1)
      saveToStorage()
    }
  }

  const removeItem = (itemId: number) => {
    if (items.value.has(itemId)) {
      items.value.delete(itemId)
      saveToStorage()
    }
  }

  const getItemIds = () => {
    return Array.from(items.value.keys())
  }

  const clearCart = () => {
    items.value.clear()
    saveToStorage()
  }

  const getTotalItemsCount = () => {
    return Array.from(items.value.values()).reduce((acc, quantity) => acc + quantity, 0)
  }

  return {
    items,
    setItem,
    decrement,
    removeItem,
    clearCart,
    getTotalItemsCount,
    getItemIds
  }
}

const itemsFromStorage = localStorage.getItem('cart_items')
const parsedItems: CartItem[] = itemsFromStorage ? JSON.parse(itemsFromStorage) : []

export default useCartData(parsedItems)
