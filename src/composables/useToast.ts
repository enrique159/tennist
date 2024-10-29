import { ref } from 'vue'

export type ToastOptions = {
  show?: boolean
  message: string
  duration?: number
  dismissable?: boolean
  color?: string
  icon?: string
  mode?: 'ios' | 'md'
  position?: 'top' | 'bottom' | 'middle'
  success?: boolean
}

// TODO: Agregar botones como parametro
const toast = ref<ToastOptions>({
  show: false,
  message: '',
  duration: 5000,
  dismissable: true,
  color: undefined,
  icon: undefined,
  mode: 'ios',
  position: 'top',
  success: false,
})

export const useToast = () => {
  const showToast = (options: ToastOptions) => {
    toast.value.show = true
    toast.value.message = options.message
    toast.value.duration = options.duration || 5000
    toast.value.dismissable = options.dismissable || true
    toast.value.color = options.color || undefined
    toast.value.icon = options.icon || undefined
    toast.value.mode = options.mode || 'ios'
    toast.value.position = options.position || 'top'
    toast.value.success = options.success || false
  }

  const dismissToast = () => {
    toast.value.show = false
  }

  const errorToast = (message: string) => {
    const toastOptions = { message, color: 'danger' }
    showToast(toastOptions)
  }

  const successToast = (message: string) => {
    const toastOptions = { message, success: true }
    showToast(toastOptions)
  }

  const warningToast = (message: string) => {
    const toastOptions = { message, color: 'warning' }
    showToast(toastOptions)
  }

  return {
    toast,
    showToast,
    dismissToast,
    errorToast,
    successToast,
    warningToast,
  }
}