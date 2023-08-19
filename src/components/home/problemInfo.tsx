import React from 'react'

import { Problem } from '@src/models/problem'

import { css } from '@styled-system/css'

const style = css({
  padding: '16px',
  backgroundColor: 'gray.50',
  fontSize: '14px',
  color: 'gray.500',
})

export const ProblemInfo: React.FC<{ problem: Problem }> = ({
  problem: {
    difficulty,
    link: { answer, question },
  },
}) => {
  return (
    <div className={style}>
      <p>Difficulty: {difficulty}</p>
      <div>
        <ul>
          <li>
            <a href={question} target="_blank">
              Question
            </a>
          </li>
          <li>
            <a href={answer} target="_blank">
              Playground
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
