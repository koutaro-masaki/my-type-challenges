import React from 'react'

import { css } from '@styled-system/css'

const style = css({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
})

export const Header: React.FC = () => {
  return (
    <h1 className={style}>
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
