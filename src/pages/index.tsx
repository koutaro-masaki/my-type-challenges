import React, { ChangeEvent, useCallback } from 'react'

import { Button } from '@src/components/common'
import { Header, Playground, ProblemInfo, SolutionInfo, useDialog } from '@src/components/home'
import { exportSolutions, importSolutions, saveSolution } from '@src/lib/store'
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

  const handleOpen = useCallback(async () => {
    const result = await showDialog()
    if (result) {
      setSelectedProblem(result.program)
      // FIXME: urlが変わってない場合でも強制的にリロードさせたい
      setSelectedUrl(result.solution.url)
      setSolutionId(result.solution.id)
      titleInputRef.current != null && (titleInputRef.current.value = result.solution.title)
      urlInputRef.current != null && (urlInputRef.current.value = result.solution.url ?? '')
      solvedRef.current != null && (solvedRef.current.checked = result.solution.solved)
    }
  }, [showDialog])

  const handleExport = useCallback(() => {
    const data = exportSolutions()
    const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-type-challenges.json'
    a.target = '_blank'
    a.click()
  }, [])
  const handleImport = useCallback(() => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.setAttribute('hidden', 'true')

    fileInput.addEventListener(
      'change',
      async (e) => {
        const file = (e as unknown as ChangeEvent<HTMLInputElement>).target?.files?.[0]
        if (!file) return

        const reader = new FileReader()
        const result = await new Promise<string | null>((resolve) => {
          reader.onload = (e) => {
            const fileContents = e.target?.result
            if (typeof fileContents !== 'string') return null

            resolve(fileContents)
          }
          reader.readAsText(file)
        })

        if (!result) return

        importSolutions(result)
      },
      false
    )

    document.body.appendChild(fileInput)
    fileInput.click()
    fileInput.remove()
  }, [])

  return (
    <main className={css({ minHeight: '100vh', width: '100vw' })}>
      <div className={flex({ flexDirection: 'row', gap: '16px' })}>
        <div className={css({ paddingLeft: '16px' })}>
          <Header />

          <Button variant="primary" onClick={handleOpen}>
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

          <Button variant="primary" onClick={handleExport}>
            Export
          </Button>
          <Button variant="primary" onClick={handleImport}>
            Import
          </Button>
        </div>
        <div className={css({ width: '100%', height: '100vh', padding: '16px' })}>
          {selectedUrl ? <Playground src={selectedUrl} /> : <Box width="100%" height="100%" bg="gray.200" />}
        </div>
      </div>
      {renderDialog()}
    </main>
  )
}
