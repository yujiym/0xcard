import LabelIcon from '@/components/LabelIcon'
import { Input } from '@/components/ui/Input'
import InputError from '@/components/form/InputError'
import { useFormContext } from 'react-hook-form'
import { Lock } from 'lucide-react'

export default function CustomInputField({
  index,
  placeholder,
}: {
  index: number
  placeholder?: string
}) {
  const methods = useFormContext()

  return (
    <>
      <label className="grid grid-cols-3 gap-4 mb-2 mt-6">
        <Input
          id={`customFields-${index}-emoji`}
          className=""
          placeholder="Select emoji"
          disabled
          {...methods.register(`customFields[${index}].emoji`)}
        />
        <Input
          id={`customFields-${index}-label`}
          className="col-span-2"
          placeholder="Label"
          {...methods.register(`customFields[${index}].label`)}
        />
      </label>
      <Input
        id={`customFields-${index}-content`}
        className=""
        placeholder={placeholder}
        {...methods.register(`customFields[${index}].content`)}
      />
      <div className="flex justify-between">
        <div>
          <InputError
            error={
              methods.formState.errors.customFields?.[index]?.content?.message
            }
          />
        </div>
        <div className="flex items-center mt-2">
          <Lock strokeWidth={2} size={16} />
          <select
            {...methods.register(`customFields[${index}].visibility`)}
            id={`customFields-${index}-visibility`}
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
