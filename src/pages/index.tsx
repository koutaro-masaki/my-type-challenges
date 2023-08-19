import React, { useCallback } from 'react'

import { Button } from '@src/components/common'
import { Header, Playground, ProblemInfo, SolutionInfo, useDialog } from '@src/components/home'
import { saveSolution } from '@src/lib/store'
import { Problem } from '@src/models'

import { css } from '@styled-system/css'
import { Box } from '@styled-system/jsx'
import { flex } from '@styled-system/patterns'

export default function Home() {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem>()
  const [selectedUrl, setSelectedUrl] = React.useState<string | null>(null)
  const [solutionId, setSolutionId] = React.useState<string>()

  const titleInputRef = React.useRef<HTMLInputElement>(null)
  const urlInputRef = React.useRef<HTMLInputElement>(null)
  const solvedRef = React.useRef<HTMLInputElement>(null)

  const handleSave = useCallback(() => {
    if (solutionId == null || selectedProblem == null) return
    if (!(titleInputRef.current && urlInputRef.current && solvedRef.current)) return

    const title = titleInputRef.current.value
    const url = urlInputRef.current.value.replace('play?#code', 'play#code')
    const solved = solvedRef.current.checked

    saveSolution({ problem: selectedProblem, solution: { id: solutionId, url, title, solved } })
  }, [selectedProblem, solutionId])

  const { renderDialog, showDialog } = useDialog()

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

          <Button variant="primary" onClick={handleShowDialog}>
            Open
          </Button>

          <Box height="4" />

          {selectedProblem && (
            <>
              <ProblemInfo problem={selectedProblem} />
              <Box height="4" />

              <SolutionInfo
                titleInputRef={titleInputRef}
                urlInputRef={urlInputRef}
                solvedInputRef={solvedRef}
                onSave={handleSave}
              />
            </>
          )}
        </div>
        <div className={css({ width: '100%', height: '100vh', padding: '16px' })}>
          {selectedUrl && <Playground src={selectedUrl} />}
        </div>
      </div>
      {renderDialog()}
    </main>
  )
}
