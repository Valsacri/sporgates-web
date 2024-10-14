'use client'

import { useEffect, useState } from 'react'

interface Callbacks<T> {
  fetch: () => Promise<T>
  onError?: (error: any) => any
}

/**
 * Uses the given fetch callback to fetch and return the data, loading state and error
 * Passes errors to the onError callback
 */
export const useFetch = <T>(init: any, { fetch, onError }: Callbacks<T>, deps: any[] = []) => {
  const [data, setData] = useState<T>(init)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const setFetchData = async () => {
    try {
      setLoading(true)

      const data = await fetch()
      setData(data)
    } catch (error: any) {
      console.error(error)
      setError(error)
      onError?.(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setFetchData()
  }, deps)

  return { data, setData, loading, error, refetch: setFetchData }
}
