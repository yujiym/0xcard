import LabelIcon from '@/components/LabelIcon'
import { socialLists } from '@0xcard/lib/const'

type Props = {
  userData: any[]
  mode?: 'edit' | 'view'
}

export default function Profile({ userData, mode = 'view' }: Props) {
  const user = (name: string) =>
    userData.find(el => el.name === name)?.content ?? ''

  return (
    <div className="">
      <div className="pt-8 flex justify-center">
        <img
          src={user('photo1')}
          alt={user('name')}
          className={`rounded-full border-4 border-background ${
            user('photo2') ? '-mr-2 z-10' : ''
          }`}
          width={100}
          height={100}
        />
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
          <p className="text-xl font-bold">{user('name')}</p>
          <p className="mt-4 text-sm">{user('about')}</p>
        </div>
        <ul>
          {socialLists.map(
            (item: any) =>
              user(item.name) && (
                <li key={item.name} className="mb-4 sm:mx-12">
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
            <li className="mb-4 sm:mx-12">
              <a
                href={user('email')}
                target="_blank"
                className="px-8 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 w-full flex items-center"
              >
                <LabelIcon name="email" className="mr-3" />
                {`mailto:${user('email')}`}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
