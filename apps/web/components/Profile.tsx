import LabelIcon from '@/components/LabelIcon'
import { socialLists } from '@0xcard/lib/const'
import { Edit3 } from 'lucide-react'

type Props = {
  userData: any[]
  mode?: 'edit' | 'view'
  klass?: string
}

export default function Profile({
  userData,
  mode = 'view',
  klass = '',
}: Props) {
  const noData = userData.length < 1
  const user = (name: string) =>
    userData.find(el => el.name === name)?.content ?? ''

  return (
    <div className={klass}>
      <div className="pt-8 flex justify-center">
        {user('photo1') ? (
          <img
            src={user('photo1')}
            alt={user('name')}
            className={`rounded-full border-4 border-background ${
              user('photo2') ? '-mr-2 z-10' : ''
            }`}
            width={100}
            height={100}
          />
        ) : (
          <div
            className={`rounded-full border-4 border-background bg-stripe w-[100px] h-[100px] ${
              user('photo2') ? '-mr-2 z-10' : ''
            }`}
          />
        )}
        {user('photo2') && (
          <img
            src={user('photo2')}
            alt={user('name')}
            className="rounded-full border-4 border-background -ml-2 z-0"
            width={100}
            height={100}
          />
        )}
      </div>
      <div className="px-6">
        <div className="text-center mt-6 mb-10 ">
          <p className="text-xl font-bold">
            {noData ? <span>Your Name</span> : user('name')}
          </p>
          <p className="mt-4 text-sm">
            {noData ? (
              <p className="inline whitespace-normal">
                Not registered yet. Press
                <Edit3 size={18} className="mx-1 inline-block" />
                at the bottom to register.
              </p>
            ) : (
              user('about')
            )}
          </p>
        </div>
        <ul className="sm:mx-12">
          {socialLists.map(
            (item: any) =>
              user(item.name) && (
                <li key={item.name} className="mb-3">
                  <a
                    href={user(item.name)}
                    target="_blank"
                    className="px-8 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 w-full flex items-center"
                  >
                    <LabelIcon name={item.name} className="mr-3" />
                    {item.label}
                  </a>
                </li>
              )
          )}
          {user('email') && (
            <li className="mb-3">
              <a
                href={`mailto:${user('email') ?? ''}`}
                className="px-8 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 w-full flex items-center"
              >
                <LabelIcon name="email" className="mr-3" />
                {user('email')}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
