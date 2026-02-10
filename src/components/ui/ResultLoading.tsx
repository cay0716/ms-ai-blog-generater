export default function Loading() {
  return(
    <div className="flex justify-left gap-2 py-8">
      <span className="loading-dot" />
      <span className="loading-dot delay-100" />
      <span className="loading-dot delay-200" />
    </div>
  )
}