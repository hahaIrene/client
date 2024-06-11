import React, { useEffect } from 'react'

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
): void => {
  const handleClickOutside = (event: MouseEvent): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent): void =>
      handleClickOutside(event)

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [ref, callback])
}

export default useOutsideClick
