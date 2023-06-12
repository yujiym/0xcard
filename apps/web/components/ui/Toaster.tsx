'use client'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="p-4 shadow-sm bg-primary text-background border-none flex items-center"
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-gray-200 hover:text-background" />
          </Toast>
        )
      })}
      <ToastViewport className="top-12 sm:top-12 sm:bottom-auto sm:left-auto sm:right-0" />
    </ToastProvider>
  )
}
