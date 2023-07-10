export const Spinner: React.FC = () => {
  return (
    <div className="animate-spin inline-block w-9 h-9 border-[7px] border-current border-t-transparent text-sky-700 rounded-full" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  )
}
