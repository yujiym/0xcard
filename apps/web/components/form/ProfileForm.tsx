'use client'
import { useState, useEffect } from 'react'
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
import { socialLists } from '@/../../packages/lib/const'

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
  const { upload, read } = useWeb3Storage()

  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
  })

  // useEffect(() => {
  //   console.log('hash', hash, prepareFn.isSuccess, prepareFn.error, prepareFn)
  //   if (prepareFn.isSuccess) {
  //     console.log('write')
  //     writeFn?.write()
  //     if (writeFn.isSuccess && waitFn.isSuccess) {
  //       toast('Profile updated', { icon: '👌' })
  //     }
  //   }
  // }, [hash, prepareFn.isSuccess])

  const onSubmit = async (data: any) => {
    const vcf = formatVcard(data)
    const cid = await upload(vcf)

    // if (!!address) {
    //   const publicFields = data.fields
    //     .filter((f: any) => f.visibility === 'public')
    //     .map((f: any) => {
    //       return {
    //         key: f.key,
    //         content: f.content,
    //       }
    //     })
    //   const privateFields = data.fields
    //     .filter((f: any) => f.visibility === 'friends')
    //     .map((f: any) => {
    //       return {
    //         key: f.key,
    //         content: f.content,
    //       }
    //     })
    //   let postData = {
    //     ownerAddress: address,
    //     name: data.name,
    //     about: data.about,
    //     photoURL: data.photoURL,
    //     publicFields,
    //     privateFields,
    //   }
    //   const res = await putFn(postData)
    //   setHash(res)
    // }
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
            label="Profile icon URL"
            description="Your public profile icon. NFT etc."
          />
        </div>
        <InputField
          name="photo2"
          label="Profile photo URL"
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
          index={1}
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
