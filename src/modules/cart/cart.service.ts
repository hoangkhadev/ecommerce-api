/**Node modules */
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

/**Repositories */
import { variantRepository } from '@/modules/product/variant/variant.repository'
import { cartRepository } from '@/modules/cart/cart.repository'

/**Api error */
import { AppError } from '@/errors/AppError'

/**Types */
import type { T_AddItemInput } from '@/modules/cart/cart.schema'

export const cartService = {
  addItem: async (userId: number, input: T_AddItemInput) => {
    const variant = await variantRepository.findById(input.productVariantId)
    if (!variant) {
      throw new AppError('Variant not found', StatusCodes.NOT_FOUND)
    }

    let cart = await cartRepository.findByUserId(userId)
    if (!cart) {
      cart = await cartRepository.create(userId)
    }

    const existingItem = await cartRepository.findItem(
      cart.id,
      input.productVariantId
    )
    if (existingItem) {
      const newQuantity = existingItem.quantity + input.quantity
      await cartRepository.updateItem(
        existingItem.id,
        newQuantity,
        variant.price.mul(newQuantity)
      )
    } else {
      await cartRepository.createItem(
        cart.id,
        input.productVariantId,
        input.quantity,
        variant.price.mul(input.quantity)
      )
    }

    const result = await cartRepository.updateCartTotal(cart.id)
    return result
  },
  getCart: async (userId: number) => {
    const cart = await cartRepository.findCartDetail(userId)
    if (!cart) {
      return { total: 0, items: [] }
    }

    return {
      id: cart.id,
      total: cart.total,
      items: cart.cartItems.map((item) => ({
        id: item.id,
        total: item.total,
        quantity: item.quantity,
        variant: {
          id: item.variant.id,
          sku: item.variant.sku,
          price: item.variant.price,
          product: item.variant.product,
          image: item.variant.images[0]?.imageUrl || null
        }
      }))
    }
  },
  updateItem: async (userId: number, itemId: number, quantity: number) => {
    const item = await cartRepository.findByItemId(itemId)
    if (!item) {
      throw new AppError('Cart item not found', StatusCodes.NOT_FOUND)
    }

    if (item.cart.userId !== userId) {
      throw new AppError(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      )
    }

    if (quantity === 0) {
      await cartRepository.deleteItem(itemId)
      await cartRepository.updateCartTotal(item.cartId)
      return {
        message: 'Item removed'
      }
    }

    const variant = item.variant
    if (!variant || variant.deletedAt) {
      throw new AppError('Variant not found', StatusCodes.NOT_FOUND)
    }

    const newTotal = variant.price.mul(quantity)
    await cartRepository.updateItem(itemId, quantity, newTotal)
    await cartRepository.updateCartTotal(item.cartId)

    return { message: 'Item updated' }
  },
  deleteItem: async (itemId: number, userId: number) => {
    const item = await cartRepository.findByItemId(itemId)
    if (!item) {
      throw new AppError('Item not found', StatusCodes.NOT_FOUND)
    }

    if (item.cart.userId !== userId) {
      throw new AppError(
        getReasonPhrase(StatusCodes.FORBIDDEN),
        StatusCodes.FORBIDDEN
      )
    }

    await cartRepository.deleteItem(itemId)
    await cartRepository.updateCartTotal(item.cartId)
  },
  clearCart: async (userId: number) => {
    const cart = await cartRepository.findByUserId(userId)
    if (!cart) {
      return { message: 'Cart already empty!' }
    }
    await cartRepository.clearCart(cart.id)
    return { message: 'Cart cleared' }
  }
}
