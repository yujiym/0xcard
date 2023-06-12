export default function InputError({
  error,
}: {
  error: string | any | undefined
}) {
  return (
    error && (
      <p className="text-xs pt-1 pl-3">
        <span className="highlight-error">{error}</span>
      </p>
    )
  )
}
