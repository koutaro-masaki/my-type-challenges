export type Difficulty = 'warm-up' | 'easy' | 'medium' | 'hard' | 'extreme'

export type Problem = {
  number: number
  title: string
  link: {
    question: string
    answer: string
  }
  hasJp: boolean
  difficulty: Difficulty
}
