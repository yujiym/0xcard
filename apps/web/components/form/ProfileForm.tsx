'use client'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Textarea from '@/components/form/Textarea'
import Input from '@/components/form/Input'
import InputField from '@/components/form/InputField'
import CustomInputField from '@/components/form/CustomInputField'
import { Save } from 'lucide-react'
import { formatVcard } from '@/lib/vcard'
import useWeb3Storage from '@/hooks/useWeb3Storage'
import { useAtomValue } from 'jotai'
import { sessionAtom } from '@/lib/atoms'
import { socialLists, formFieldLists, formLists } from '@0xcard/lib/const'
import { db } from '@/components/PolybaseWrapper'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const schema = z.object({
  name: z.string().max(120).nonempty(),
  about: z.string().max(1000).optional(),
  photo1: z.string().url().optional().or(z.literal('')),
  fields: z.array(
    z.object({
      name: z.string().max(120).nonempty(),
      content: z
        .string()
        .url()
        .or(z.string().email())
        .or(z.string().regex(phoneRegex, 'Invalid phone number.'))
        .or(z.literal('')),
      visibility: z.enum(['public', 'friends']),
    })
  ),
  customFields: z.array(
    z.object({
      label: z.string().max(120).or(z.literal('')),
      content: z.string().url().or(z.literal('')),
      visibility: z.enum(['public', 'friends']),
    })
  ),
})
type SchemaType = z.infer<typeof schema>

export default function ProfileForm() {
  const { upload, read, reading } = useWeb3Storage()
  const { data: sessionData } = useAtomValue(sessionAtom)
  const cid = 'bafybeighuv7gi76m4veniiaa7qdtnspuuyhp243veoi4pc2wg7lrqgth4y' // TODO: set from db

  const getUserData = async () => {
    console.log('aaaaa1')
    const userCollection = db.collection('users')
    console.log('aaaaa2', userCollection)
    const res = await userCollection.get()
    console.log('res2*****', res)
    return res
  }

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    ;(async () => {
      if (cid) {
        await read(cid)
        await getUserData()
      }
    })()
  }, [cid])

  useEffect(() => {
    if (!reading && sessionData) {
      // Set form value
      const user = (name: string) =>
        sessionData.find(el => el.name === name)?.content ?? ''
      formLists.map((item: any) => {
        user(item.name) && methods.setValue(item.name, user(item.name))
      })
      formFieldLists.map((item: any) => {
        user(item.name) &&
          // @ts-ignore
          methods.setValue(`fields[${item.index}].content`, user(item.name))
      })
    }
  }, [reading, sessionData])

  const onSubmit = async (data: any) => {
    const vcf = formatVcard(data)
    const cid = await upload(vcf)
    const userCollection = db.collection('users')
    const res = userCollection.get()
    console.log('res', res)
  }

  return (
    <FormProvider {...methods}>
      <form className="p-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="pb-4">
          <Input name="name" label="Name" />
        </div>
        <div className="pb-4">
          <Textarea
            name="about"
            label="About me"
            placeholder="I am a hacker."
          />
        </div>
        <div className="pb-4">
          <Input
            name="photo1"
            label="Profile Icon"
            placeholder="https://example.com/my-public-photo.jpg"
            description="Your public photo."
          />
        </div>
        <InputField
          name="photo2"
          label="Profile Photo"
          placeholder="https://example.com/my-photo.jpg"
          index={0}
          description="Your live-action photo. Can be set to private."
        />
        <h3 className="mt-8 mb-6 font-mono text-xl border-l-8 px-3">
          Social Links
        </h3>
        {socialLists.map((item: any) => (
          <InputField
            key={`${item.name}-${item.index}`}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            index={item.index}
          />
        ))}
        <InputField
          name="email"
          label="Email"
          placeholder="me@who-am-i.com"
          index={8}
        />
        <h3 className="mt-8 mb-6 font-mono text-xl border-l-8 px-3">
          Other Links
        </h3>
        <CustomInputField placeholder="https://example.com" index={0} />
        <CustomInputField placeholder="https://example.com" index={1} />
        <CustomInputField placeholder="https://example.com" index={2} />
        <CustomInputField placeholder="https://example.com" index={3} />
        <CustomInputField placeholder="https://example.com" index={4} />
        <button
          type="submit"
          title="Save to IPFS"
          className="fixed right-4 md:bottom-3 bottom-16 z-50 rounded-full h-16 w-16 flex justify-center items-center text-background bg-primary border-4 border-background"
        >
          <Save />
        </button>
      </form>
    </FormProvider>
  )
}
