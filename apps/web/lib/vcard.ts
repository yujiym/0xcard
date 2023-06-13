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

export const formatVcard = (data: any) => {
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
      [new AltidParameter(new TextType('About'))],
      new TextType(data.about)
    )
    arr.push(about)
  }
  if (data.icon) {
    arr.push(
      new PhotoProperty(
        [new AltidParameter(new TextType('PROFILE-PUBLIC-PHOTO'))],
        new URIType(data.icon)
      )
    )
  }
  const photo = publicFields.find(f => f.name === 'photo')?.content
  if (photo) {
    arr.push(
      new PhotoProperty(
        [new AltidParameter(new TextType('PROFILE-PHOTO'))],
        new URIType(photo)
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

  const card = new VCARD(arr)
  return card.repr()
}

export const parseVcard = (vcf: any) => parse(vcf)
