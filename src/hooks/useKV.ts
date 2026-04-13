import { useState, useEffect, useCallback } from 'react'

/**
 * A localStorage-backed key-value store hook that replaces @github/spark useKV.
 * Data persists across page reloads. For cross-tab sync, a storage event listener
 * keeps state in sync when the same key is modified in another tab.
 */
export function useKV<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const storageKey = `nepa-kv:${key}`

  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored !== null) {
        return JSON.parse(stored) as T
      }
    } catch {
      // Ignore parse errors, fall through to default
    }
    return defaultValue
  })

  // Persist to localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
    } catch {
      // Ignore quota errors
    }
  }, [storageKey, value])

  // Sync across tabs via storage event
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue) as T)
        } catch {
          // Ignore
        }
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [storageKey])

  const setter = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(prev)
          : newValue
        return resolved
      })
    },
    []
  )

  return [value, setter]
}
