import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '../../../stores/products'
import type { ProductInterface } from '../../../types/products'

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty products array and zero total', () => {
    const store = useProductsStore()
    expect(store.products).toEqual([])
    expect(store.totalProducts).toBe(0)
  })

  it('should set products correctly', () => {
    const store = useProductsStore()
    const mockProducts: ProductInterface[] = [
      { 
        id: 1, 
        title: 'Product 1',
        price: 100,
        description: 'Description 1',
        category: 'Electronics',
        stock: 10,
        rating: 4.5,
        date: '2024-04-19T12:00:00Z'
      },
      { 
        id: 2, 
        title: 'Product 2',
        price: 200,
        description: 'Description 2',
        category: 'Books',
        stock: 5,
        rating: 4.0,
        date: '2024-04-19T12:00:00Z'
      }
    ]

    store.setProducts(mockProducts)
    expect(store.products).toEqual(mockProducts)
  })

  it('should set total products correctly', () => {
    const store = useProductsStore()
    store.setTotalProducts(42)
    expect(store.totalProducts).toBe(42)
  })
}) 