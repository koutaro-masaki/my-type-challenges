import { forwardRef, useCallback, useRef, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import { css } from '@styled-system/css'

const dialogStyle = css({
  padding: '0',
  '&::backdrop': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

type Props = {
  isOpen: boolean
  children?: React.ReactNode | React.ReactNode[]
  onClose: VoidFunction
}

export const Dialog = forwardRef<HTMLDialogElement, Props>(({ isOpen, children, onClose }, ref) => {
  const handleClickContent = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }, [])

  return (
    <RemoveScroll removeScrollBar enabled={isOpen}>
      <dialog className={dialogStyle} ref={ref} onClick={onClose}>
        <div className={css({ padding: '1em' })} onClick={handleClickContent}>
          {children}
        </div>
      </dialog>
    </RemoveScroll>
  )
})
Dialog.displayName = 'Dialog'

export const useDialogProps = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleOpen = useCallback(() => {
    if (!dialogRef.current || isOpen) return

    setIsOpen(true)
    dialogRef.current.showModal()
  }, [isOpen])
  const handleClose = useCallback(() => {
    if (!dialogRef.current || !isOpen) return

    setIsOpen(false)
    dialogRef.current.close()
  }, [isOpen])

  return {
    isOpen,
    dialogRef,
    onOpen: handleOpen,
    onClose: handleClose,
  }
}
