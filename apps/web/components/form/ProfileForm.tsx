'use client'
import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Textarea from '@/components/form/Textarea'
import Input from '@/components/form/Input'
import InputField from '@/components/form/InputField'
import CustomInputField from '@/components/form/CustomInputField'
import { Save, User2 } from 'lucide-react'
import { formatVcard } from '@/lib/vcard'
import { upload } from '@/lib/web3Storage'
// import { useStorage } from '@common/react-lib/hooks/useStorage'
// import useSetIPFSHash from '@common/react-lib/hooks/useSetIPFSHash'

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const schema = z.object({
  name: z.string().max(120).nonempty(),
  about: z.string().max(1000).optional(),
  email: z.string().email().min(5).optional().or(z.literal('')),
  icon: z.string().url().optional().or(z.literal('')),
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
  // const { getFn, putFn } = useStorage()
  // const { address } = useAccount()
  // const [hash, setHash] = useState<string>('')
  // const { prepareFn, writeFn, waitFn } = useSetIPFSHash(hash)

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
    console.log('vcf: ', vcf)
    const cid = await upload(vcf)
    console.log('upload complete - cid: ', cid)

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
        {/* <h3 className="mb-6 font-mono text-xl border-l-8 px-3">Profile</h3> */}
        <div className="pb-4">
          <Input name="name" label="Name" />
        </div>
        <div className="pb-4">
          <Textarea name="about" label="About me" placeholder="I am hacker." />
        </div>
        <div className="pb-4">
          <Input
            name="icon"
            label="Profile icon URL"
            description="Your public profile icon. NFT etc."
          />
        </div>
        <InputField
          name="photo"
          label="Profile photo URL"
          index={0}
          description="Your live-action photo. Can be set to private."
        />
        <h3 className="mt-8 mb-6 font-mono text-xl border-l-8 px-3">
          Social Links
        </h3>
        <InputField
          name="facebook"
          label="Facebook"
          placeholder="https://fb.com/who-am-i"
          index={2}
        />
        <InputField
          name="twitter"
          label="Twitter"
          placeholder="https://twitter.com/who-am-i"
          index={3}
        />
        <InputField
          name="instagram"
          label="Instagram"
          placeholder="https://instagram.com/who-am-i"
          index={4}
        />
        <InputField
          name="github"
          label="Github"
          placeholder="https://github.com/who-am-i"
          index={5}
        />
        <InputField
          name="telegram"
          label="Telegram"
          placeholder="https://t.me/who-am-i"
          index={6}
        />
        <InputField
          name="linkedin"
          label="Linkedin"
          placeholder="https://linkedin.com/who-am-i"
          index={7}
        />
        <InputField
          name="whatsapp"
          label="Whatsapp"
          placeholder="+9190000000000"
          index={8}
        />
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
