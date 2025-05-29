
import toast from 'react-hot-toast'

export function notifySuccess(msg: string) {
  toast.success(msg)
}

export function notifyError(msg: string) {
  toast.error(msg)
}
