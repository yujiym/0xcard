export const siteUrl: string = 'https://0x.cards' as const
export const siteTitle: string = '0xCARD' as const
export const siteDescription: string =
  '0xCARD - Decentralized business card protocol with privacy' as const

export const socialLists = [
  {
    name: 'facebook',
    label: 'Facebook',
    placeholder: 'https://fb.com/who-am-i',
    index: 2,
  },
  {
    name: 'twitter',
    label: 'Twitter',
    placeholder: 'https://twitter.com/who-am-i',
    index: 3,
  },
  {
    name: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/who-am-i',
    index: 4,
  },
  {
    name: 'github',
    label: 'Github',
    placeholder: 'https://github.com/who-am-i',
    index: 5,
  },
  {
    name: 'telegram',
    label: 'Telegram',
    placeholder: 'https://t.me/who-am-i',
    index: 6,
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/who-am-i',
    index: 7,
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp',
    placeholder: '+9190000000000',
    index: 8,
  },
] as const

export const socialNames = socialLists.map((item: any) => item.name)
export const socialLabels = socialLists.map((item: any) => item.label)
