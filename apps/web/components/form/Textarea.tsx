import { Textarea } from '@/components/ui/Textarea'
import InputError from '@/components/form/InputError'
import { useFormContext } from 'react-hook-form'

export default function TextareaSet({
  name,
  label,
  description,
  placeholder,
}: {
  name: string
  label: string
  description?: string
  placeholder?: string
}) {
  const methods = useFormContext()

  return (
    <>
      <label htmlFor={name} className="text-lg">
        {label}
        {description && <span className="text-xs ml-3">({description})</span>}
      </label>
      <Textarea
        {...methods.register(name)}
        id={name}
        placeholder={placeholder}
      />
      <InputError error={methods.formState.errors[name]?.message} />
    </>
  )
}
