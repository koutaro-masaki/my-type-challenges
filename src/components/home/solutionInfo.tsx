import { css } from '@styled-system/css'

import { Button } from '../common/button'

const inputStyle = css({
  border: 'none',
  borderBottom: '1px solid',
  display: 'block',
})

type Props = {
  titleInputRef: React.RefObject<HTMLInputElement>
  urlInputRef: React.RefObject<HTMLInputElement>
  solvedInputRef: React.RefObject<HTMLInputElement>
  onSave: () => void
}
export const SolutionInfo: React.FC<Props> = ({ solvedInputRef, titleInputRef, urlInputRef, onSave }) => {
  return (
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
        <input id="mark-as-solved" ref={solvedInputRef} type="checkbox"></input>
        <label htmlFor="mark-as-solved" className={css({ userSelect: 'none' })}>
          Solved
        </label>
      </div>
      <Button variant="secondary" onClick={onSave}>
        Save
      </Button>
    </div>
  )
}
