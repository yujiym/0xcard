import LabelIcon from '@/components/LabelIcon'
import { Input } from '@/components/ui/Input'
import InputError from '@/components/form/InputError'
import { useFormContext } from 'react-hook-form'
import { Lock } from 'lucide-react'

export default function InputField({
  name,
  label,
  index,
  description,
  placeholder,
}: {
  name: string
  label: string
  index: number
  description?: string
  placeholder?: string
}) {
  const methods = useFormContext()

  return (
    <>
      <label htmlFor={name} className="flex items-center">
        <LabelIcon name={name} className="mr-1" />
        <span className="text-lg">{label}</span>
        {description && <span className="text-xs ml-3">({description})</span>}
      </label>
      <input
        type="hidden"
        id={`fields-${index}-name`}
        className="hidden"
        value={name}
        {...methods.register(`fields[${index}].name`)}
      />
      <Input
        id={`fields-${index}-content`}
        className=""
        placeholder={placeholder}
        {...methods.register(`fields[${index}].content`)}
      />
      <div className="flex justify-between">
        <div>
          <InputError
            error={methods.formState.errors.fields?.[index]?.content?.message}
          />
        </div>
        <div className="flex items-center mt-2">
          <Lock strokeWidth={2} size={16} />
          <select
            {...methods.register(`fields[${index}].visibility`)}
            id={`fields-${index}-visibility`}
            defaultValue="public"
            className="bg-transparent border px-3 py-1 flex items-center ml-1.5 text-xs rounded-sm"
          >
            <option value="public">Public</option>
            <option value="friends">Only in contacts</option>
          </select>
        </div>
      </div>
    </>
  )
}
