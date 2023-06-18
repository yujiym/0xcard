import {
  TelProperty,
  EmailProperty,
  TitleProperty,
  URLProperty,
  PhotoProperty,
  NoteProperty,
  AltidParameter,
  PrefParameter,
  IntegerType,
  URIType,
  TypeParameter,
  TextType,
  Group,
  FNProperty,
  AdrProperty,
  SpecialValueType,
  NProperty,
  VCARD,
  parse,
} from 'vcard4'
import { socialLists } from '@0xcard/lib/const'
import { encryptAndSave, decryptAndRead } from '@/lib/lit'

export const formatVcard = async (data: any, userId: string, cid: string) => {
  const publicFields = data.fields
    .filter((f: any) => f.visibility === 'public')
    .map((f: any) => {
      return {
        name: f.name,
        content: f.content,
      }
    })
  const privateFields = data.fields
    .filter((f: any) => f.visibility === 'friends')
    .map((f: any) => {
      return {
        name: f.name,
        content: f.content,
      }
    })

  const fn = new FNProperty([], new TextType(data.name))
  let arr = [fn]

  if (data.about) {
    const about = new NoteProperty(
      [new AltidParameter(new TextType('ABOUT'))],
      new TextType(data.about)
    )
    arr.push(about)
  }
  if (data.photo1) {
    arr.push(
      new PhotoProperty(
        [new AltidParameter(new TextType('PROFILE-PUBLIC-PHOTO'))],
        new URIType(data.photo1)
      )
    )
  }
  const photo2 = publicFields.find(f => f.name === 'photo2')?.content
  if (photo2) {
    arr.push(
      new PhotoProperty(
        [new AltidParameter(new TextType('PROFILE-PHOTO'))],
        new URIType(photo2)
      )
    )
  }
  const email = publicFields.find(f => f.name === 'email')?.content
  if (email) {
    arr.push(new EmailProperty([], new TextType(email)))
  }
  socialLists.map((item: any) => {
    const content = publicFields.find(f => f.name === item.name)?.content
    if (content) {
      arr.push(
        new URLProperty(
          [new AltidParameter(new TextType(item.label.toUpperCase()))],
          new URIType(content)
        )
      )
    }
  })

  if (privateFields.length > 0) {
    const [encryptedSymmetricKey, encryptedContent] = await encryptAndSave(
      JSON.stringify(privateFields),
      userId,
      cid
    )
    const encContent = new NoteProperty(
      [new AltidParameter(new TextType('ENCRYPTED-CONTENT'))],
      new TextType(encryptedContent)
    )
    const encKey = new NoteProperty(
      [new AltidParameter(new TextType('ENCRYPTED-KEY'))],
      new TextType(encryptedSymmetricKey)
    )
    arr.push(encContent)
    arr.push(encKey)
  }

  const card = new VCARD(arr)
  return card.repr()
}

export const parseVcard = async (vcf: any, userId: string, cid: string) => {
  // @ts-ignore
  const data: any[] = parse(vcf)?.parsedVcard
  const encContent =
    data.find(
      el =>
        el.property === 'NOTE' && el.parameters.ALTID === 'ENCRYPTED-CONTENT'
    )?.value ?? ''
  const encKey =
    data.find(
      el => el.property === 'NOTE' && el.parameters.ALTID === 'ENCRYPTED-KEY'
    )?.value ?? ''
  let privateFields = []
  if (encContent && encKey) {
    const res = await decryptAndRead(encKey, encContent, userId, cid)
    privateFields = JSON.parse(res)
  }
  return {
    data,
    privateFields,
  }
}
