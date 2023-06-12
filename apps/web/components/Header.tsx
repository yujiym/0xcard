export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="font-mono text-xl h-14 border-b fixed w-full z-50 top-0 bg-background/70 backdrop-blur-sm">
      <div className="container-sm h-14 flex items-center px-5">{children}</div>
    </header>
  )
}
