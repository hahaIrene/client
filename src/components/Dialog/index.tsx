import { DialogContext } from '@/providers/dialog'
import React, { useContext } from 'react'

const Dialog = () => {
  const { open, title, message, onClose, onApply } = useContext(DialogContext)
  return (
    <dialog
      id="my_modal_1"
      className="modal bg-zinc-400/25 backdrop-blur-sm"
      open={open}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <div className=" flex gap-2">
              <button className="btn btn-error btn-outline" onClick={onClose}>
                取消
              </button>
              <button className="btn " onClick={onApply}>
                確定
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default Dialog
