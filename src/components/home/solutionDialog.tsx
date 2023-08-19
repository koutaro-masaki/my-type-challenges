import React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { getProblem, problems } from '@src/data/problems'
import { css } from '@styled-system/css'
import { Dialog, useDialogProps } from '@src/components/common/dialog'
import { Problem } from '@src/models/problem'
import { Solution } from '@src/models/solution'

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

const getKey = (problem: Problem) => `${problem.number}_${problem.title}`

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
      <ul className={css({ paddingLeft: '2' })}>
        {currentSolutions.map(({ id, title, solved }, i) => (
          <li key={id} className={css({ listStyleType: 'none' })} value={i} onClick={() => setSelectedSolutionIndex(i)}>
            {selectedSolutionIndex === i ? '👉 ' : null}
            {solved ? '✅' : '🤔'} {title ?? '(untitled)'}
          </li>
        ))}
      </ul>
      <button disabled={selectedSolutionIndex == null} onClick={handleClose}>
        OK
      </button>
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
