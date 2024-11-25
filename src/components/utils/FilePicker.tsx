import React, { forwardRef, ChangeEvent, Ref } from 'react'

interface Props {
  multiple?: boolean
  onChange: (files: File[]) => void
  accept?: string
}

export const FilePicker = forwardRef(({ onChange, multiple, accept }: Props, ref: Ref<HTMLInputElement>) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }
    const files = Array.from(event.target.files)
    onChange(files)
  }

  return <input type='file' accept={accept} multiple={multiple} onChange={handleChange} className='hidden' ref={ref} />
})
