export const siteUrl: string =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost:3000'
    : ('https://0x.cards' as const)
export const siteTitle: string = '0xCARD' as const
export const siteDescription: string =
  '0xCARD - Decentralized business card protocol with privacy' as const

export const socialLists = [
  {
    name: 'facebook',
    label: 'Facebook',
    placeholder: 'https://fb.com/who-am-i',
    type: 'url',
    index: 1,
  },
  {
    name: 'twitter',
    label: 'Twitter',
    placeholder: 'https://twitter.com/who-am-i',
    type: 'url',
    index: 2,
  },
  {
    name: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/who-am-i',
    type: 'url',
    index: 3,
  },
  {
    name: 'github',
    label: 'Github',
    placeholder: 'https://github.com/who-am-i',
    type: 'url',
    index: 4,
  },
  {
    name: 'telegram',
    label: 'Telegram',
    placeholder: 'https://t.me/who-am-i',
    type: 'url',
    index: 5,
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/who-am-i',
    type: 'url',
    index: 6,
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    placeholder: 'https://wa.me/9190000000000',
    type: 'tel',
    index: 7,
  },
]

export const formFieldLists = [
  {
    name: 'photo2',
    label: 'Profile Photo',
    placeholder: 'https://example.com/my-photo.jpg',
    description: 'Your live-action photo. Can be set to private.',
    type: 'url',
    index: 0,
  },
  socialLists,
  {
    name: 'email',
    label: 'Email',
    placeholder: 'me@g-mail.com',
    type: 'email',
    index: 8,
  },
].flat()

export const formLists = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'about',
    label: 'About me',
    type: 'text',
  },
  {
    name: 'photo1',
    label: 'Profile Icon',
    placeholder: 'https://example.com/my-public-photo.jpg',
    description: 'Your public photo.',
    type: 'url',
  },
]

export const socialNames = socialLists.map((item: any) => item.name)
export const socialLabels = socialLists.map((item: any) => item.label)
