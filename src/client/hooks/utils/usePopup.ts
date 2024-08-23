'use client'

import { useState } from 'react'

export const usePopup = (init = false) => {
  const [open, setOpen] = useState(init)

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  return [open, handleToggle, setOpen] as const
}
