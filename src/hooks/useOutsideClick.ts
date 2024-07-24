'use client'

import { useEffect } from 'react'

/**
 * Calls the given callback when the user clicks outside the given element
 */
export const useOutsideClick = (ref: any, callback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref.current])
}
