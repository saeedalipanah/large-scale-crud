import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { ThemesStore } from '../../../stores/themes'
import  { themeE } from '../../../types/themes'

describe('Themes Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn()
    }
    global.localStorage = localStorageMock as any

    // Mock document.documentElement
    const classListMock = {
      add: vi.fn(),
      remove: vi.fn()
    }
    // @ts-ignore
    document.documentElement.classList = classListMock as any
  })

  it('should initialize with light theme', () => {
    const store = ThemesStore()
    expect(store.currentTheme).toBe(themeE.Light)
  })

  it('should switch to dark theme', () => {
    const store = ThemesStore()
    store.setTheme(themeE.Dark)
    
    expect(store.currentTheme).toBe(themeE.Dark)
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', themeE.Dark)
    // expect(document.documentElement.classList).toContain('dark')
  })

  it('should switch to light theme', () => {
    const store = ThemesStore()
    store.setTheme(themeE.Light)
    
    expect(store.currentTheme).toBe(themeE.Light)
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', themeE.Light)
    // expect(document.documentElement.classList).not.toContain('dark')
  })
}) 