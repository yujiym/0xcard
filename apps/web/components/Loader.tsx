import style from './Loader.module.css'

export default function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className={style.loader} />
    </div>
  )
}
