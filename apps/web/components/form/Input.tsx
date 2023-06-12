import { Input } from '@/components/ui/Input'
import InputError from '@/components/form/InputError'
import { useFormContext } from 'react-hook-form'

export default function InputSet({
  name,
  label,
  description,
  ...props
}: {
  name: string
  label: string
  description?: string
}) {
  const methods = useFormContext()

  return (
    <>
      <label htmlFor={name} className="text-lg">
        <span className="text-lg">{label}</span>
        {description && <span className="text-xs ml-3">({description})</span>}
      </label>
      <Input {...methods.register(name)} id={name} {...props} />
      <InputError error={methods.formState.errors[name]?.message} />
    </>
  )
}
