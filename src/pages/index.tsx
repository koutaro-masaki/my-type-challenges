import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Problem, getProblem, problems } from '@src/data/problems'
import { css } from '@styled-system/css'
import { flex } from '@styled-system/patterns'
import { Dialog, useDialogProps } from '@src/components/dialog'
import { Box } from '@styled-system/jsx'

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
const inputStyle = css({
  border: 'none',
  borderBottom: '1px solid',
  display: 'block',
})

type Solution = {
  id: string
  url: string | null
  title: string
  createdAt: string
  solved: boolean
}
const getKey = (problem: Problem) => `${problem.number}_${problem.title}`

export default function Home() {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem>(problems[0])
  const [selectedUrl, setSelectedUrl] = React.useState<string | null>(null)
  const [solutionId, setSolutionId] = React.useState<string>()

  const titleInputRef = React.useRef<HTMLInputElement>(null)
  const urlInputRef = React.useRef<HTMLInputElement>(null)
  const [solved, setSolved] = React.useState(false)

  const handleSave = useCallback(() => {
    const title = titleInputRef.current?.value ?? ''
    const url = urlInputRef.current?.value.replace('play?#code', 'play#code')
    if (url && solutionId != null) {
      const solution: Solution = {
        id: solutionId,
        url,
        title,
        createdAt: new Date().toISOString(),
        solved,
      }

      const key = getKey(selectedProblem)
      console.log(key, solutionId)

      const solutions = (JSON.parse(localStorage.getItem(key) || '[]') as Solution[]).flatMap((s) =>
        s.id === solutionId ? [solution] : [s]
      )
      if (solutions.filter((s) => s.id === solutionId).length === 0) {
        solutions.push(solution)
      }

      localStorage.setItem(key, JSON.stringify(solutions))
    }
  }, [selectedProblem, solutionId, solved])

  const { renderDialog, showDialog } = useDialog()

  useEffect(() => {
    ;(async () => {
      const result = await showDialog(false)
      if (result) {
        setSelectedProblem(result.program)
        setSelectedUrl(result.solution.url)
        setSolutionId(result.solution.id)
        titleInputRef.current?.value != null && (titleInputRef.current.value = result.solution.title)
        urlInputRef.current?.value != null && (urlInputRef.current.value = result.solution.url ?? '')
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShowDialog = useCallback(async () => {
    const result = await showDialog()
    if (result) {
      setSelectedProblem(result.program)
      setSelectedUrl(result.solution.url)
      setSolutionId(result.solution.id)
      titleInputRef.current?.value != null && (titleInputRef.current.value = result.solution.title)
      urlInputRef.current?.value != null && (urlInputRef.current.value = result.solution.url ?? '')
    }
  }, [showDialog])

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

          <Box height="4" />

          <ProblemInfo problem={selectedProblem} />

          <Box height="4" />

          <div
            className={css({
              padding: '16px',
              backgroundColor: 'gray.50',
              fontSize: '14px',
              color: 'gray.500',
            })}
          >
            <label htmlFor="title-input">Title</label>
            <input id="title-input" ref={titleInputRef} type="text" className={inputStyle}></input>
            <label htmlFor="url-input">URL</label>
            <input id="url-input" ref={urlInputRef} type="text" className={inputStyle}></input>
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
          </div>

          <button onClick={handleShowDialog}>open</button>
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
  const [resolve, setResolve] = useState<((value: DialogResolverProps | null) => void) | undefined>(undefined)
  const [allowCancel, setAllowCancel] = useState(true)

  // TODO: ここらへんもuseDialogPropsに混ぜ込んでしまいたい
  // useDialog側はDialogコンポーネントを使って、Dialogの中身を定義するだけにしたい
  const handleCancel = useCallback(() => {
    if (!allowCancel) return
    onClose()
    resolve?.(null)
  }, [allowCancel, onClose, resolve])
  const handleClose = useCallback(
    (x: DialogResolverProps) => {
      onClose()
      resolve?.(x)
    },
    [onClose, resolve]
  )

  const renderDialog = useCallback(() => {
    return (
      <Dialog ref={dialogRef} isOpen={isOpen} onClose={handleCancel}>
        {isOpen && <DialogBody resolve={handleClose} />}
      </Dialog>
    )
  }, [dialogRef, isOpen, handleCancel, handleClose])
  const showDialog = useCallback(
    (allowCancel?: boolean) =>
      new Promise<DialogResolverProps | null>((resolve) => {
        setAllowCancel(allowCancel ?? true)
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

type DialogResolverProps = { program: Problem; solution: Solution }

const DialogBody: React.FC<{ resolve: (value: DialogResolverProps) => void }> = ({ resolve }) => {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem>(problems[0])
  const handleSelectProblem = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const problem = getProblem(e.target.value)
    if (problem) {
      setSelectedProblem(problem)
      const key = getKey(problem)

      const solutions = JSON.parse(localStorage.getItem(key) || '[]')
      console.log(key, solutions)
      setSelectedSolutionIndex(undefined)
    }
  }, [])

  const [selectedSolutionIndex, setSelectedSolutionIndex] = React.useState<number | undefined>(undefined)

  const currentSolutions = useMemo(() => {
    const key = getKey(selectedProblem)
    const solutions = JSON.parse(localStorage.getItem(key) || '[]') as Solution[]
    // TODO: バリデーション入れる
    return solutions
  }, [selectedProblem])

  const handleClose = useCallback(() => {
    if (selectedSolutionIndex == null) return
    resolve({
      program: selectedProblem,
      solution: currentSolutions[selectedSolutionIndex],
    })
  }, [currentSolutions, resolve, selectedProblem, selectedSolutionIndex])

  const handleNew = useCallback(() => {
    resolve({
      program: selectedProblem,
      solution: {
        id: self.crypto.randomUUID(),
        url: selectedProblem.link.answer,
        title: '',
        createdAt: new Date().toISOString(),
        solved: false,
      },
    })
  }, [resolve, selectedProblem])

  return (
    <>
      <select className={selectStyle} value={selectedProblem.number} onChange={handleSelectProblem}>
        {problems.map((problem) => (
          <option key={problem.number} value={problem.number}>
            {`${problem.number} - ${problem.title}`}
          </option>
        ))}
      </select>
      <button onClick={handleNew}>New</button>
      <ul>
        {currentSolutions.map(({ createdAt, solved }, i) => (
          <li key={createdAt} value={i} onClick={() => setSelectedSolutionIndex(i)}>
            {selectedSolutionIndex === i ? '👉' : null}
            {solved ? '✅' : '🤔'} {createdAt.substring(0, 10)}
          </li>
        ))}
      </ul>
      <button disabled={selectedSolutionIndex == null} onClick={handleClose}>
        OK
      </button>
    </>
  )
}
