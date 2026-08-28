import { useCallback, useEffect, useRef, useState } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])
  const timeoutIds = useRef(new Map())

  const dismissToast = useCallback((id) => {
    setToasts((previousToasts) => previousToasts.filter((toast) => toast.id !== id))
    const timeoutId = timeoutIds.current.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutIds.current.delete(id)
    }
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((previousToasts) => [...previousToasts, { id, message, type }])
    const timeoutId = setTimeout(() => dismissToast(id), 3000)
    timeoutIds.current.set(id, timeoutId)
  }, [dismissToast])

  useEffect(() => () => {
    timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId))
  }, [])

  return { toasts, showToast, dismissToast }
}
