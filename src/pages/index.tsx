import React, { useCallback, useEffect, useState } from 'react'
import { Problem, getProblem, problems } from '@src/data/problems'
import { css } from '@styled-system/css'
import { flex } from '@styled-system/patterns'
import { Dialog, useDialogProps } from '@src/components/dialog'

const selectStyle = css({
  width: '300px',
  color: 'gray.900',
  backgroundColor: 'gray.50',
  border: '1px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  fontSize: 'sm',
  paddingX: '16px',
  paddingY: '8px',
  appearance: 'none',
  '&:focus': {
    outline: 'none',
    borderColor: 'blue.500',
  },
  '&:focus-visible': {
    outline: 'none',
    borderColor: 'blue.500',
  },
  '&:hover': {
    borderColor: 'blue.500',
  },
  '&:active': {
    borderColor: 'blue.500',
  },
  '&:disabled': {
    backgroundColor: 'gray.100',
    borderColor: 'gray.300',
    color: 'gray.400',
  },
})

type Solution = {
  url: string | null
  createdAt: string
  solved: boolean
}
const getKey = (problem: Problem) => `${problem.number}_${problem.title}`

export default function Home() {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem>(problems[0])
  const [selectedUrl, setSelectedUrl] = React.useState<string | null>(null)
  const [currentSolutions, setCurrentSolutions] = React.useState<Solution[]>([])
  const [selectedSolutionIndex, setSelectedSolutionIndex] = React.useState<number | undefined>(undefined)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [solved, setSolved] = React.useState(false)

  const handleSave = useCallback(() => {
    const url = inputRef.current?.value.replace('play?#code', 'play#code')
    if (url) {
      const solution: Solution = {
        url,
        createdAt: new Date().toISOString(),
        solved,
      }

      const key = getKey(selectedProblem)

      const solutions = JSON.parse(localStorage.getItem(key) || '[]')
      localStorage.setItem(key, JSON.stringify([...solutions, solution]))
      setCurrentSolutions([...solutions, solution])
    }
  }, [selectedProblem, solved])

  const handleSelectProblem = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const problem = getProblem(e.target.value)
    if (problem) {
      setSelectedProblem(problem)

      const key = getKey(problem)

      const solutions = JSON.parse(localStorage.getItem(key) || '[]')
      setCurrentSolutions(solutions)
      setSelectedUrl(problem.link.answer)
    }
  }, [])

  const handleSelectSolution = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const i = Number(e.target.value)
      const solution = currentSolutions[i]
      setSelectedSolutionIndex(i)
      setSelectedUrl(solution.url)
    },
    [currentSolutions]
  )

  const { renderDialog, showDialog } = useDialog()

  useEffect(() => {
    const defaultProblem = problems[0]

    const key = getKey(defaultProblem)
    const solutions = JSON.parse(localStorage.getItem(key) || '[]')
    setCurrentSolutions(solutions)
    setSelectedUrl(defaultProblem.link.answer)
  }, [])

  return (
    <main
      className={css({
        minHeight: '100vh',
        width: '100vw',
      })}
    >
      <div
        className={flex({
          flexDirection: 'row',
          gap: '16px',
        })}
      >
        <div
          className={css({
            paddingLeft: '16px',
          })}
        >
          <Header />
          <select
            className={selectStyle}
            value={selectedProblem.number}
            defaultValue={2}
            onChange={handleSelectProblem}
          >
            {problems.map((problem) => (
              <option key={problem.number} value={problem.number}>
                {`${problem.number} - ${problem.title}`}
              </option>
            ))}
          </select>
          <ProblemInfo problem={selectedProblem} />

          {currentSolutions.length > 0 && (
            <select className={selectStyle} value={selectedSolutionIndex} onChange={handleSelectSolution}>
              {currentSolutions.map(({ createdAt, solved }, i) => (
                <option key={createdAt} value={i}>
                  {solved ? '✅' : '🤔'} {createdAt.substring(0, 10)}
                </option>
              ))}
            </select>
          )}

          <input
            ref={inputRef}
            type="text"
            className={css({
              border: '1px solid',
              display: 'block',
            })}
          ></input>
          <div>
            <input
              id="mark-as-solved"
              type="checkbox"
              checked={solved}
              onChange={(e) => {
                setSolved(e.target.checked)
              }}
            ></input>
            <label
              htmlFor="mark-as-solved"
              className={css({
                userSelect: 'none',
              })}
            >
              Solved
            </label>
          </div>
          <button onClick={handleSave}>Save</button>

          <button onClick={showDialog}>open</button>
          {renderDialog()}
        </div>
        <div
          className={css({
            width: '100%',
            height: '100vh',
            padding: '16px',
          })}
        >
          {selectedUrl && <IFrameTab src={selectedUrl} />}
        </div>
      </div>
    </main>
  )
}

type IFrameTabProps = {
  src: string
}
const IFrameTab: React.FC<IFrameTabProps> = ({ src }) => {
  return <iframe src={src} allow="clipboard-read; clipboard-write" width="100%" height="100%" allowFullScreen></iframe>
}

const Header: React.FC = () => {
  return (
    <h1
      className={css({
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
      })}
    >
      Lets play{' '}
      <a href="https://github.com/type-challenges/type-challenges/blob/main/README.md" target="_blank">
        <span className={css({ color: '#294f80' })}>Type</span>
        <span className={css({ color: '#231f20' })}>{'<'}</span>
        <span className={css({ color: '#4265af' })}>Challenge</span>
        <span className={css({ color: '#231f20' })}>{'[]>'}</span>
      </a>
    </h1>
  )
}

const ProblemInfo: React.FC<{ problem: Problem }> = ({ problem }) => {
  return (
    <div
      className={css({
        padding: '16px',
        backgroundColor: 'gray.50',
        fontSize: '14px',
        color: 'gray.500',
      })}
    >
      <p>Difficulty: {problem.difficulty}</p>
      <div>
        <ul>
          <li>
            <a href={problem.link.question} target="_blank">
              Question
            </a>
          </li>
          <li>
            <a href={problem.link.answer} target="_blank">
              Playground
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export const useDialog = () => {
  const { isOpen, dialogRef, onOpen, onClose } = useDialogProps()
  const [resolve, setResolve] = useState<((ok: boolean) => void) | undefined>(undefined)

  // TODO: ここらへんもuseDialogPropsに混ぜ込んでしまいたい
  // useDialog側はDialogコンポーネントを使って、Dialogの中身を定義するだけにしたい
  const handleCancel = useCallback(() => {
    onClose()
    resolve?.(false)
  }, [onClose, resolve])
  const handleClose = useCallback(() => {
    onClose()
    resolve?.(true)
  }, [onClose, resolve])
  const renderDialog = useCallback(() => {
    return (
      <Dialog ref={dialogRef} isOpen={isOpen} onClose={handleCancel}>
        <div>hello</div>
        <button onClick={handleClose}>OK</button>
      </Dialog>
    )
  }, [isOpen, dialogRef, handleClose, handleCancel])
  const showDialog = useCallback(
    () =>
      new Promise<void>((resolve) => {
        onOpen()
        setResolve(() => resolve)
      }),
    [onOpen]
  )

  return {
    renderDialog,
    showDialog,
  }
}
