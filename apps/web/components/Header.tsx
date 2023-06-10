export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="font-mono text-xl h-14 border-b">
      <div className="container-sm h-14 flex items-center px-5">{children}</div>
    </header>
  )
}
