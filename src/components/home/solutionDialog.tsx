import React from 'react'
import { useCallback, useMemo, useState } from 'react'

import { Dialog, useDialogProps } from '@src/components/common/dialog'
import { getProblem, problems } from '@src/data/problems'
import { readSolutions } from '@src/lib/store'
import { Difficulty, Problem } from '@src/models/problem'
import { Solution } from '@src/models/solution'

import { css } from '@styled-system/css'
import { Flex } from '@styled-system/jsx'

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
const liStyle = css({
  listStyleType: 'none',
  cursor: 'pointer',
})

type DialogResolverProps = { program: Problem; solution: Solution }

const helloWorld = problems.find((problem) => problem.difficulty === 'warm-up')!
const DialogBody: React.FC<{ resolve: (value: DialogResolverProps) => void }> = ({ resolve }) => {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem>(helloWorld)
  const handleSelectProblem = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const problem = getProblem(e.target.value)
    if (problem) {
      setSelectedProblem(problem)
      setSelectedSolutionIndex(undefined)
    }
  }, [])

  const [selectedSolutionIndex, setSelectedSolutionIndex] = React.useState<number | undefined>(undefined)

  const currentSolutions = useMemo(() => readSolutions({ problem: selectedProblem }), [selectedProblem])

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
        solved: false,
      },
    })
  }, [resolve, selectedProblem])

  return (
    <>
      <select className={selectStyle} value={selectedProblem.number} onChange={handleSelectProblem}>
        <DifficultyOrdererdProblems />
      </select>
      <Flex justifyContent="center" gap="2" marginTop="4">
        <button onClick={handleNew}>New</button>
        <button disabled={selectedSolutionIndex == null} onClick={handleClose}>
          OK
        </button>
      </Flex>
      <p>Solutions</p>
      <ul className={css({ paddingLeft: '2' })}>
        {currentSolutions.map(({ id, title, solved }, i) => (
          <li key={id} className={liStyle} value={i} onClick={() => setSelectedSolutionIndex(i)}>
            {selectedSolutionIndex === i ? '👉 ' : null}
            {solved ? '✅' : '🤔'} {title || '(untitled)'}
          </li>
        ))}
      </ul>
    </>
  )
}

const IndexOrdererdProblems: React.FC = () => {
  return problems.map((problem) => (
    <option key={problem.number} value={problem.number}>
      {`${problem.number} - ${problem.title}`}
    </option>
  ))
}

const withSolved = (problem: Problem) => ({ ...problem, solved: readSolutions({ problem }).some((s) => s.solved) })
const filterByDifficulty = (difficulty: Difficulty) => (problem: Problem) => problem.difficulty === difficulty
const DifficultyOrdererdProblems: React.FC = () => {
  const { warmUp, easy, medium, hard, extreme } = useMemo(
    () => ({
      warmUp: problems.filter(filterByDifficulty('warm-up')).map(withSolved),
      easy: problems.filter(filterByDifficulty('easy')).map(withSolved),
      medium: problems.filter(filterByDifficulty('medium')).map(withSolved),
      hard: problems.filter(filterByDifficulty('hard')).map(withSolved),
      extreme: problems.filter(filterByDifficulty('extreme')).map(withSolved),
    }),
    []
  )

  return (
    <>
      <optgroup label="Warm-up">
        {warmUp.map(({ solved, ...problem }) => (
          <option key={problem.number} value={problem.number}>
            {`${problem.number} - ${problem.title}${solved ? ' ✅' : ''}`}
          </option>
        ))}
      </optgroup>
      <optgroup label="Easy">
        {easy.map(({ solved, ...problem }) => (
          <option key={problem.number} value={problem.number}>
            {`${problem.number} - ${problem.title}${solved ? ' ✅' : ''}`}
          </option>
        ))}
      </optgroup>
      <optgroup label="Medium">
        {medium.map(({ solved, ...problem }) => (
          <option key={problem.number} value={problem.number}>
            {`${problem.number} - ${problem.title}${solved ? ' ✅' : ''}`}
          </option>
        ))}
      </optgroup>
      <optgroup label="Hard">
        {hard.map(({ solved, ...problem }) => (
          <option key={problem.number} value={problem.number}>
            {`${problem.number} - ${problem.title}${solved ? ' ✅' : ''}`}
          </option>
        ))}
      </optgroup>
      <optgroup label="Extreme">
        {extreme.map(({ solved, ...problem }) => (
          <option key={problem.number} value={problem.number}>
            {`${problem.number} - ${problem.title}${solved ? ' ✅' : ''}`}
          </option>
        ))}
      </optgroup>
    </>
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
