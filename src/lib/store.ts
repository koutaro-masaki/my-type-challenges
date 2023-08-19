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

export const exportSolutions = () => {
  function* getItems() {
    for (const problem of problems) {
      const item = readSolutions({ problem }).map(({ title, url, solved }) => ({ title, url, solved }))
      if (item.length) {
        yield [getKey(problem), JSON.stringify(item)]
      }
    }
  }

  return Object.fromEntries(getItems()) as Record<string, string>
}

export const importSolutions = (rawData: string) => {
  const problemMap = new Map(problems.map((p) => [getKey(p), p]))

  const data = JSON.parse(rawData)
  if (typeof data !== 'object' || data === null) {
    console.log('parse failed', rawData)
    return
  }

  for (const [key, value] of Object.entries(data)) {
    if (typeof key !== 'string' || typeof value !== 'string') {
      console.log('invalid field', key, value)
      continue
    }

    const problem = problemMap.get(key)
    if (problem == null) continue

    const parsed = JSON.parse(value) as unknown

    if (!Array.isArray(parsed)) {
      console.log('parse failed', value)
      continue
    }

    const solutions: Solution[] = []
    for (const item of parsed) {
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
