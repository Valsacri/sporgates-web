import { useCallback, useState } from 'react'

interface AlertMessage {
  type: 'success' | 'error'
  message: string
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertMessage | null>(null)

  const handleShowAlert = useCallback((alert: AlertMessage) => {
    setAlert(alert)
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }, [])

  return { alert, handleShowAlert }
}
