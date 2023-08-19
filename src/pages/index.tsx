import React, { useCallback, useEffect } from 'react'
import { problems } from '@src/data/problems'
import { css } from '@styled-system/css'
import { flex } from '@styled-system/patterns'
import { Box } from '@styled-system/jsx'
import { Problem, Solution } from '@src/models'
import { Playground, Header, ProblemInfo, SolutionInfo, useDialog } from '@src/components/home'
import { saveSolution } from '@src/lib/store'

export default function Home() {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem>(problems[0])
  const [selectedUrl, setSelectedUrl] = React.useState<string | null>(null)
  const [solutionId, setSolutionId] = React.useState<string>()

  const titleInputRef = React.useRef<HTMLInputElement>(null)
  const urlInputRef = React.useRef<HTMLInputElement>(null)
  const solvedRef = React.useRef<HTMLInputElement>(null)

  const handleSave = useCallback(() => {
    if (solutionId == null) return
    if (!(titleInputRef.current && urlInputRef.current && solvedRef.current)) return

    const title = titleInputRef.current.value
    const url = urlInputRef.current.value.replace('play?#code', 'play#code')
    const solved = solvedRef.current.checked

    const solution: Solution = {
      id: solutionId,
      url,
      title,
      solved,
    }

    saveSolution({ problem: selectedProblem, solution })
  }, [selectedProblem, solutionId])

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
    <main className={css({ minHeight: '100vh', width: '100vw' })}>
      <div className={flex({ flexDirection: 'row', gap: '16px' })}>
        <div className={css({ paddingLeft: '16px' })}>
          <Header />

          <Box height="4" />

          <ProblemInfo problem={selectedProblem} />

          <Box height="4" />

          <SolutionInfo
            titleInputRef={titleInputRef}
            urlInputRef={urlInputRef}
            solvedInputRef={solvedRef}
            onSave={handleSave}
          />
          <button onClick={handleShowDialog}>open</button>
          {renderDialog()}
        </div>
        <div className={css({ width: '100%', height: '100vh', padding: '16px' })}>
          {selectedUrl && <Playground src={selectedUrl} />}
        </div>
      </div>
    </main>
  )
}
