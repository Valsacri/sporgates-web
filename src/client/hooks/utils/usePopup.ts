'use client'

import { useState } from 'react'

export const usePopup = (init = false) => {
  const [open, setOpen] = useState(init)

  const toggle = () => {
    setOpen((open) => !open)
  }

  return [open, toggle, setOpen] as const
}
