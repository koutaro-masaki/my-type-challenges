export type Solution = {
  id: string
  url: string | null
  title: string
  solved: boolean
}

export const isSolution = (obj: unknown): obj is Solution => {
  if (typeof obj !== 'object' || obj === null) return false
  const solution = obj as Solution
  return (
    typeof solution.id === 'string' &&
    typeof solution.url === 'string' &&
    typeof solution.title === 'string' &&
    typeof solution.solved === 'boolean'
  )
}
