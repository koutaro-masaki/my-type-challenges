import { Solution, Problem } from '@src/models'

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
