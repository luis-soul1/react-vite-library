import { useState } from 'react'

export type TToggleActions<D = void, A = void> = {
  modalAction?: A
  modalData?: D
}

const useModal = <T, D = void>() => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  const [data, setData] = useState<T>()
  const [action, setAction] = useState<D>()

  const toggle = ({ modalAction = undefined, modalData = undefined }: TToggleActions<T, D> = {}) => {
    setisOpen(!isOpen)
    if (modalData !== data) setData(modalData)
    if (modalAction !== action) setAction(modalAction)
  }

  const updateAction = (dialogAction?: D) => {
    setAction(dialogAction ?? undefined)
  }

  const updateData = (dialogData?: T) => {
    setData(dialogData ?? undefined)
  }

  return { isOpen, data, action, toggle, updateAction, updateData }
}

export default useModal
