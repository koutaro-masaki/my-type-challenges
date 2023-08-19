import { problems } from '@src/data/problems'
import { Problem, Solution, isSolution } from '@src/models'

const getKey = (problem: Problem) => `${problem.number}_${problem.title}`

export const readSolutions = ({ problem }: { problem: Problem }) => {
  const key = getKey(problem)
  // TODO: バリデーション
  return JSON.parse(localStorage.getItem(key) || '[]') as Solution[]
}

export const saveSolution = ({ problem, solution }: { problem: Problem; solution: Solution }) => {
  const solutions = readSolutions({ problem })
  const hasSaved = solutions.filter((s) => s.id === solution.id).length > 0
  const newSolutions = hasSaved ? solutions.map((s) => (s.id === solution.id ? solution : s)) : [...solutions, solution]

  const key = getKey(problem)
  localStorage.setItem(key, JSON.stringify(newSolutions))
}

export const exportSolutions = (): Record<string, Pick<Solution, 'url' | 'title' | 'solved'>[]> => {
  function* getItems() {
    for (const problem of problems) {
      const item = readSolutions({ problem }).map(({ title, url, solved }) => ({ title, url, solved }))
      if (item.length) {
        yield [getKey(problem), item] as const
      }
    }
  }

  return Object.fromEntries(getItems())
}

export const importSolutions = (rawData: string) => {
  const problemMap = new Map(problems.map((p) => [getKey(p), p]))

  const data = JSON.parse(rawData)
  if (typeof data !== 'object' || data === null) {
    console.log('parse failed', rawData)
    return
  }

  for (const [key, value] of Object.entries(data)) {
    if (typeof key !== 'string') {
      console.log('invalid key', key)
      continue
    }

    const problem = problemMap.get(key)
    if (problem == null) continue

    if (!Array.isArray(value)) {
      console.log('parse failed', value)
      continue
    }

    const solutions: Solution[] = []
    for (const item of value) {
      if (typeof item !== 'object' || item === null) {
        console.log('invalid item', item)
        continue
      }

      const solution = {
        id: self.crypto.randomUUID(),
        title: item.title ?? '',
        url: item.url,
        solved: !!item.solved,
      } satisfies Solution

      if (!isSolution(solution)) {
        console.log('invalid item', item)
        continue
      }

      solutions.push(solution)
    }

    localStorage.setItem(key, JSON.stringify(solutions))
  }
}
